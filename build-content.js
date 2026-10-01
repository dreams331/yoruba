#!/usr/bin/env node

/**
 * Build Content Script
 * 
 * This script processes Markdown files from the CMS content directory
 * and generates JSON files that can be used by the frontend JavaScript.
 * 
 * Run with: node build-content.js
 */

const fs = require('fs');
const path = require('path');

// Simple front-matter parser
function parseFrontMatter(content) {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);
    
    if (!match) {
        return { metadata: {}, content: content };
    }
    
    const frontMatter = match[1];
    const bodyContent = match[2];
    
    const metadata = {};
    const lines = frontMatter.split('\n');
    
    let currentKey = null;
    let arrayValues = [];
    let inArray = false;
    
    lines.forEach(line => {
        const colonIndex = line.indexOf(':');
        
        // Check if we're continuing an array
        if (inArray && line.trim().startsWith('-')) {
            const arrayValue = line.trim().substring(1).trim().replace(/^["']|["']$/g, '');
            arrayValues.push(arrayValue);
            return;
        } else if (inArray) {
            // End of array
            metadata[currentKey] = arrayValues;
            inArray = false;
            arrayValues = [];
        }
        
        if (colonIndex > -1) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();
            currentKey = key;
            
            // Handle null values
            if (value === 'null' || value === '') {
                metadata[key] = null;
                return;
            }
            
            // Handle boolean values
            if (value === 'true') {
                metadata[key] = true;
                return;
            }
            if (value === 'false') {
                metadata[key] = false;
                return;
            }
            
            // Remove quotes
            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
                // Unescape any backslash-escaped quotes inside the string (e.g. \" -> ")
                value = value.replace(/\\"/g, '"').replace(/\\'/g, "'");
            }
            
            // Handle inline arrays [item1, item2]
            if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(item => 
                    item.trim().replace(/^["']|["']$/g, '')
                );
                metadata[key] = value;
                return;
            }
            
            metadata[key] = value;
        }
    });
    
    // Handle final array if file ends with one
    if (inArray) {
        metadata[currentKey] = arrayValues;
    }
    
    return { metadata, content: bodyContent.trim() };
}

// Convert markdown content to HTML-safe format
function markdownToHtml(markdown) {
    let html = markdown;
    
    // Convert headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Convert bold and italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Convert lists
    html = html.replace(/^\- (.+)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Convert numbered lists
    html = html.replace(/^\d+\. (.+)$/gim, '<li>$1</li>');
    
    // Convert paragraphs (lines separated by double newlines)
    const paragraphs = html.split('\n\n');
    html = paragraphs.map(p => {
        if (p.trim() && !p.match(/^<[h|u|o|l]/)) {
            return `<p>${p.trim()}</p>`;
        }
        return p;
    }).join('\n');
    
    // Convert links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    
    return html;
}

// Process a single markdown file
function processMarkdownFile(filePath, category) {
    const content = fs.readFileSync(filePath, 'utf8');
    const { metadata, content: bodyContent } = parseFrontMatter(content);
    
    // Generate an ID from the filename (keep hyphens for URL-friendly slugs)
    const filename = path.basename(filePath, '.md');
    const id = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '');
    
    // Convert content to HTML
    const htmlContent = markdownToHtml(bodyContent);
    
    return {
        id,
        filename,
        ...metadata,
        content: bodyContent,
        htmlContent,
        category: metadata.category || category
    };
}

// Process all markdown files in a directory
function processDirectory(dirPath, category) {
    const items = [];
    
    if (!fs.existsSync(dirPath)) {
        console.log(`Directory not found: ${dirPath}`);
        return items;
    }
    
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
        if (file.endsWith('.md')) {
            const filePath = path.join(dirPath, file);
            try {
                const item = processMarkdownFile(filePath, category);
                items.push(item);
                console.log(`✓ Processed: ${file}`);
            } catch (error) {
                console.error(`✗ Error processing ${file}:`, error.message);
            }
        }
    });
    
    return items;
}

// Escape text for safe HTML attribute/text insertion
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// Format an ISO date string to a readable form (e.g. "October 20, 2025")
function formatDateForStatic(dateString) {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
        return dateString;
    }
}

// Strip HTML tags down to plain text for excerpts, truncated to a max length
function toPlainExcerpt(html, maxLen = 160) {
    if (!html) return '';
    const text = String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return text.length > maxLen ? text.slice(0, maxLen).trim() + '…' : text;
}

// Build a static HTML snippet of content cards for a given collection,
// so crawlers that don't execute JavaScript still see real, substantive content.
// The JS-driven grid will still re-render on top of this for interactive filtering/search.
function buildStaticCards(items, options) {
    const { detailPage, categoryLabel, maxItems = 24 } = options;
    if (!items || items.length === 0) return '';

    return items.slice(0, maxItems).map((item, index) => {
        const id = index + 1; // matches content-loader.js numeric id scheme (array position)
        const title = escapeHtml(item.title || 'Untitled');
        const date = formatDateForStatic(item.date);
        const excerpt = escapeHtml(item.excerpt || toPlainExcerpt(item.htmlContent || item.content, 160));
        const category = escapeHtml(categoryLabel ? categoryLabel(item.category) : (item.category || ''));
        const image = item.image || '';
        const href = `${detailPage}?id=${id}`;

        return `<article class="article-card" data-category="${escapeHtml(item.category || '')}" data-static="true">
            <a href="${href}" class="article-image-link">
                <div class="article-image">
                    ${image ? `<img src="${escapeHtml(image)}" alt="${title}" loading="lazy">` : ''}
                    <span class="article-category">${category}</span>
                </div>
            </a>
            <div class="article-content">
                <div class="article-meta">
                    ${date ? `<span><i class="far fa-calendar"></i> ${escapeHtml(date)}</span>` : ''}
                </div>
                <h3><a href="${href}" style="color:inherit;text-decoration:none;">${title}</a></h3>
                <p>${excerpt}</p>
                <a href="${href}" class="article-link">Read Full Article <i class="fas fa-arrow-right"></i></a>
            </div>
        </article>`;
    }).join('\n');
}

// Inject a static HTML snippet into a page between marker comments inside
// a given container id, so search engines and policy crawlers see real
// content even without executing JavaScript. Safe to re-run (idempotent).
function injectStaticContent(htmlFilePath, containerId, snippet) {
    if (!fs.existsSync(htmlFilePath)) {
        console.log(`  ⚠ Skipped (file not found): ${htmlFilePath}`);
        return;
    }

    let html = fs.readFileSync(htmlFilePath, 'utf8');
    const startMarker = '<!-- STATIC_CONTENT_START -->';
    const endMarker = '<!-- STATIC_CONTENT_END -->';
    const wrapped = `${startMarker}\n${snippet}\n${endMarker}`;

    const markerBlockRegex = new RegExp(
        startMarker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + endMarker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );

    if (markerBlockRegex.test(html)) {
        // Markers already exist from a previous build — replace only that block,
        // regardless of any nested <div> elements inside (avoids greedy/closing-tag ambiguity).
        html = html.replace(markerBlockRegex, wrapped);
        fs.writeFileSync(htmlFilePath, html);
        console.log(`  ✓ Updated static content in ${path.basename(htmlFilePath)} (#${containerId})`);
        return;
    }

    // First run: no markers yet. Insert the wrapped snippet right after the
    // container's opening tag, leaving any existing placeholder content after it.
    const openTagRegex = new RegExp(`(<div[^>]*id=["']${containerId}["'][^>]*>)`);
    if (!openTagRegex.test(html)) {
        console.log(`  ⚠ Container #${containerId} not found in ${path.basename(htmlFilePath)}`);
        return;
    }

    html = html.replace(openTagRegex, (openTag) => `${openTag}\n${wrapped}`);
    fs.writeFileSync(htmlFilePath, html);
    console.log(`  ✓ Injected static content into ${path.basename(htmlFilePath)} (#${containerId})`);
}

const articleCategoryLabels = {
    history: 'History', culture: 'Culture', people: 'Notable Figures',
    diaspora: 'Diaspora', language: 'Language'
};
const storyCategoryLabels = {
    folktales: 'Folktales', legends: 'Legends', myths: 'Myths', parables: 'Parables'
};

// Generate and inject static (crawlable) content for key listing pages
function injectStaticContentForPages(results) {
    console.log('\n🧱 Injecting static content for crawlers...');

    injectStaticContent(
        path.join(__dirname, 'articles.html'),
        'articlesGrid',
        buildStaticCards(results.articles, {
            detailPage: 'article-detail.html',
            categoryLabel: (c) => articleCategoryLabels[c] || c,
            maxItems: 30
        })
    );

    injectStaticContent(
        path.join(__dirname, 'stories.html'),
        'storiesGrid',
        buildStaticCards(results.stories, {
            detailPage: 'story-detail.html',
            categoryLabel: (c) => storyCategoryLabels[c] || c,
            maxItems: 30
        })
    );

    injectStaticContent(
        path.join(__dirname, 'ifa-wisdom.html'),
        'ifaGrid',
        buildStaticCards(results.ifa, {
            detailPage: 'ifa-detail.html',
            maxItems: 30
        })
    );

    injectStaticContent(
        path.join(__dirname, 'news.html'),
        'newsList',
        buildStaticNewsCards(results.news)
    );

    injectStaticContent(
        path.join(__dirname, 'events.html'),
        'eventsGrid',
        buildStaticEventCards(results.events)
    );
}

// Build static cards for news items (no separate detail page; shown via modal in the live UI)
function buildStaticNewsCards(items) {
    if (!items || items.length === 0) return '';
    const sorted = [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
    return sorted.map(n => {
        const title = escapeHtml(n.title || 'Untitled');
        const date = formatDateForStatic(n.date);
        const excerpt = escapeHtml(n.excerpt || toPlainExcerpt(n.htmlContent || n.content, 200));
        const category = escapeHtml(n.category || '');
        const source = n.source_name ? `<p class="news-item-source">Source: ${escapeHtml(n.source_name)}</p>` : '';
        return `<article class="news-item" data-static="true">
            ${n.image ? `<img class="news-item-img" src="${escapeHtml(n.image)}" alt="${title}" loading="lazy">` : ''}
            <div class="news-item-body">
                <span class="news-item-category">${category}</span>
                <h3>${title}</h3>
                ${date ? `<p class="news-item-date">${escapeHtml(date)}</p>` : ''}
                <p>${excerpt}</p>
                ${source}
            </div>
        </article>`;
    }).join('\n');
}

// Build static cards for event items (no separate detail page; shown via modal in the live UI)
function buildStaticEventCards(items) {
    if (!items || items.length === 0) return '';
    return items.map(ev => {
        const title = escapeHtml(ev.title || 'Untitled');
        const excerpt = escapeHtml(ev.excerpt || toPlainExcerpt(ev.htmlContent || ev.content, 200));
        const type = escapeHtml(ev.type || '');
        const location = escapeHtml(ev.location || '');
        const timing = escapeHtml(ev.timing || '');
        return `<article class="event-card" data-static="true">
            ${ev.image ? `<img class="event-card-img" src="${escapeHtml(ev.image)}" alt="${title}" loading="lazy">` : ''}
            <div class="event-card-body">
                <span class="event-card-type">${type}</span>
                <h3>${title}</h3>
                <div class="event-card-meta">
                    ${location ? `<i class="fas fa-map-marker-alt"></i> ${location}` : ''}
                    ${timing ? `&middot; <i class="fas fa-calendar"></i> ${timing}` : ''}
                </div>
                <p class="event-excerpt">${excerpt}</p>
            </div>
        </article>`;
    }).join('\n');
}

// Main build function
function buildContent() {
    console.log('🔨 Building content from CMS...\n');
    
    const contentDir = path.join(__dirname, 'content');
    const outputDir = path.join(__dirname, 'data');
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Process each content type
    const collections = [
        { name: 'articles', dir: path.join(contentDir, 'articles') },
        { name: 'stories', dir: path.join(contentDir, 'stories') },
        { name: 'ifa', dir: path.join(contentDir, 'ifa') },
        { name: 'gallery', dir: path.join(contentDir, 'gallery') },
        { name: 'pages', dir: path.join(contentDir, 'pages') },
        { name: 'diaspora-countries', dir: path.join(contentDir, 'diaspora-countries') },
        { name: 'odu-ifa', dir: path.join(contentDir, 'odu-ifa') },
        { name: 'events', dir: path.join(contentDir, 'events') },
        { name: 'news', dir: path.join(contentDir, 'news') }
    ];
    
    const results = {};
    
    collections.forEach(collection => {
        console.log(`\nProcessing ${collection.name}...`);
        const items = processDirectory(collection.dir, collection.name);
        results[collection.name] = items;
        
        // Write individual collection file
        const outputPath = path.join(outputDir, `${collection.name}.json`);
        fs.writeFileSync(outputPath, JSON.stringify(items, null, 2));
        console.log(`✓ Wrote ${items.length} items to ${collection.name}.json`);
    });
    
    // Write combined data file
    const combinedPath = path.join(outputDir, 'all-content.json');
    fs.writeFileSync(combinedPath, JSON.stringify(results, null, 2));
    console.log(`\n✓ Wrote combined content to all-content.json`);

    // Inject static, crawlable HTML content into key listing pages
    injectStaticContentForPages(results);
    
    // Generate summary
    console.log('\n📊 Build Summary:');
    console.log('─────────────────────────────');
    Object.entries(results).forEach(([key, items]) => {
        console.log(`${key.padEnd(15)}: ${items.length} items`);
    });
    console.log('─────────────────────────────');
    console.log('\n✅ Content build complete!\n');
}

// Run the build
if (require.main === module) {
    try {
        buildContent();
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

module.exports = { buildContent, processMarkdownFile, markdownToHtml };
