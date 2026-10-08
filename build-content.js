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

// Trim text to the last complete sentence within maxLen (never cuts mid-sentence)
function toSentenceExcerpt(text, maxLen = 220) {
    const t = String(text || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
        .replace(/^(?:#+\s*)?I\s?ntroduction\b[:.\-–—]?\s*/i, '');
    if (t.length <= maxLen) return t;
    const cut = t.slice(0, maxLen);
    const m = cut.match(/^[\s\S]*[.!?](?=\s|$)/);
    if (m && m[0].length >= 60) return m[0].trim();
    return cut.replace(/\s+\S*$/, '').replace(/[,;:\-–—]+$/, '') + '…';
}

// Build a static HTML snippet of content cards for a given collection,
// so crawlers that don't execute JavaScript still see real, substantive content.
// The JS-driven grid will still re-render on top of this for interactive filtering/search.
function buildStaticCards(items, options) {
    const { detailPage, categoryLabel, maxItems = 24, sectionKey } = options;
    if (!items || items.length === 0) return '';
    const slugs = sectionKey ? buildSlugMap(items) : null;

    return items.slice(0, maxItems).map((item, index) => {
        const id = index + 1; // matches content-loader.js numeric id scheme (array position)
        const title = escapeHtml(item.title || 'Untitled');
        const date = formatDateForStatic(item.date);
        const excerpt = escapeHtml(item.excerpt || toPlainExcerpt(item.htmlContent || item.content, 160));
        const category = escapeHtml(categoryLabel ? categoryLabel(item.category) : (item.category || ''));
        const image = item.image || '';
        // Link to the crawlable static page when available (JS re-render still uses ?id= links)
        const href = slugs ? staticDetailUrl(sectionKey, slugs.get(item)) : `${detailPage}?id=${id}`;

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
            sectionKey: 'articles',
            categoryLabel: (c) => articleCategoryLabels[c] || c,
            maxItems: 30
        })
    );

    injectStaticContent(
        path.join(__dirname, 'stories.html'),
        'storiesGrid',
        buildStaticCards(results.stories, {
            detailPage: 'story-detail.html',
            sectionKey: 'stories',
            categoryLabel: (c) => storyCategoryLabels[c] || c,
            maxItems: 30
        })
    );

    injectStaticContent(
        path.join(__dirname, 'ifa-wisdom.html'),
        'ifaGrid',
        buildStaticCards(results.ifa, {
            detailPage: 'ifa-detail.html',
            sectionKey: 'ifa',
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

    injectStaticContent(
        path.join(__dirname, 'odu-ifa.html'),
        'oduGrid',
        buildStaticOduMejiCards(results['odu-ifa'])
    );
}

// Build static cards for the 16 principal Odù Méjì only. These carry the
// richer editorial content (proverb, associated Òrìṣà, life lesson). The 240
// Omo Odù combinations remain available through the interactive grid/modal.
function buildStaticOduMejiCards(items) {
    if (!items || items.length === 0) return '';
    return items
        .filter(o => o.category === 'Odu Meji')
        .sort((a, b) => Number(a.number) - Number(b.number))
        .map(o => {
            const title = escapeHtml(o.title || 'Untitled');
            const excerpt = escapeHtml(o.excerpt || '');
            const orisha = o.orisha ? `<p><strong>Òrìṣà:</strong> ${escapeHtml(o.orisha)}</p>` : '';
            const proverb = o.proverb_en
                ? `<p><em>${escapeHtml(o.proverb_yo || '')}</em><br><em>${escapeHtml(o.proverb_en)}</em></p>`
                : '';
            return `<div class="odu-card" data-id="${escapeHtml(o.id)}" data-static="true">
            <span class="odu-card-number">Odù #${escapeHtml(o.number)}</span>
            <h3>${title}</h3>
            <span class="odu-card-badge">${escapeHtml(o.category)}</span>
            <p>${excerpt}</p>
            ${orisha}
            ${proverb}
            <p><a href="${staticDetailUrl('odu-ifa', slugify(o.id))}">Read the full interpretation &rarr;</a></p>
        </div>`;
        }).join('\n');
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

// ── Static detail pages (full text in raw HTML for crawlers) ────────────────

// URL-safe slug: strips diacritics and non-alphanumerics
function slugify(str) {
    return String(str || '')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

const DETAIL_SECTIONS = {
    articles: { dir: 'articles', label: 'Articles', listPage: 'articles.html' },
    stories:  { dir: 'stories',  label: 'Stories',  listPage: 'stories.html' },
    ifa:      { dir: 'ifa',      label: 'IFA Wisdom', listPage: 'ifa-wisdom.html' },
    'odu-ifa': { dir: 'odu',     label: 'Odu Ifa',  listPage: 'odu-ifa.html' }
};

// Odu Ifa entries are only given a standalone, indexable page when they carry
// real written content (an "Overview" section). Templated Omo Odù stay in the
// interactive grid only, so thin pages are never published.
function isPublishableOdu(item) {
    return /^###\s+Overview\s*$/m.test(item.content || '');
}

// Unique slug per item within a collection (falls back to filename on collision)
function buildSlugMap(items) {
    const used = new Set();
    const map = new Map();
    items.forEach(item => {
        let slug = slugify(item.id) || slugify(item.filename) || 'item';
        if (used.has(slug)) slug = slugify(item.filename) || `${slug}-${used.size}`;
        used.add(slug);
        map.set(item, slug);
    });
    return map;
}

function staticDetailUrl(sectionKey, slug) {
    return `read/${DETAIL_SECTIONS[sectionKey].dir}/${slug}.html`;
}

function renderDetailPage(sectionKey, item, slug) {
    const section = DETAIL_SECTIONS[sectionKey];
    const title = escapeHtml(item.title || 'Untitled');
    const date = formatDateForStatic(item.date);
    const description = escapeHtml(item.excerpt || toPlainExcerpt(item.htmlContent || item.content, 160));
    const pageUrl = `https://yorubaheritage.com/${staticDetailUrl(sectionKey, slug)}`;
    const rawImage = item.image || 'images/uploads/yoruba-people.jpg';
    const ogImage = /^https?:/.test(rawImage) ? rawImage : `https://yorubaheritage.com/${rawImage.replace(/^\//, '')}`;
    const category = escapeHtml(item.category || section.label);
    const body = item.htmlContent || `<p>${escapeHtml(item.content || '')}</p>`;
    const moral = (sectionKey === 'stories' && item.moral)
        ? `<div class="story-moral"><h3>Moral of the story</h3><p>${escapeHtml(item.moral)}</p></div>` : '';
    const ld = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: item.title,
        description: item.excerpt || toPlainExcerpt(item.htmlContent || item.content, 160),
        image: ogImage,
        datePublished: item.date || undefined,
        author: { '@type': 'Organization', name: 'Yoruba Heritage' },
        publisher: { '@type': 'Organization', name: 'Yoruba Heritage',
            logo: { '@type': 'ImageObject', url: 'https://yorubaheritage.com/images/favicon.png' } },
        mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl }
    }).replace(/</g, '\\u003c');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base href="/">
    <title>${title} - Yoruba Heritage</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${pageUrl}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Yoruba Heritage">
    <meta property="og:title" content="${title} - Yoruba Heritage">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${escapeHtml(ogImage)}">
    <meta property="og:url" content="${pageUrl}">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#C17817">
    <link rel="icon" type="image/png" href="/images/favicon.png">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/article-detail.css">
    <link rel="alternate" type="application/rss+xml" title="Yoruba Heritage" href="/feed.xml">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1577349995482522" crossorigin="anonymous"></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-43VWC293SB"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-43VWC293SB');
    </script>
    <script type="application/ld+json">${ld}</script>
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="nav-brand"><a href="index.html"><h1><i class="fas fa-crown"></i> Yoruba Heritage</h1></a></div>
            <button class="nav-toggle" id="navToggle"><span></span><span></span><span></span></button>
            <ul class="nav-menu" id="navMenu">
                <li><a href="index.html">Home</a></li>
                <li><a href="articles.html">Articles</a></li>
                <li><a href="stories.html">Stories</a></li>
                <li><a href="ifa-wisdom.html">IFA Wisdom</a></li>
                <li><a href="odu-ifa.html">Odu Ifa</a></li>
                <li><a href="events.html">Events</a></li>
                <li><a href="news.html">Ìròyìn</a></li>
                <li><a href="yoruba-calendar.html">Calendar</a></li>
                <li><a href="gallery.html">Gallery</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="search.html" class="btn-search"><i class="fas fa-search"></i> Search</a></li>
            </ul>
        </div>
    </nav>

    <article class="article-detail">
        <div class="article-header">
            <div class="container">
                <a href="${section.listPage}" class="back-link"><i class="fas fa-arrow-left"></i> Back to ${section.label}</a>
                <div class="article-category-badge">${category}</div>
                <h1>${title}</h1>
                <div class="article-meta">
                    ${date ? `<span><i class="far fa-calendar"></i> ${escapeHtml(date)}</span>` : ''}
                    <span><i class="fas fa-user"></i> Yoruba Heritage Team</span>
                </div>
            </div>
        </div>
        ${item.image ? `<div class="article-featured-image"><img src="${escapeHtml(item.image)}" alt="${title}"></div>` : ''}
        <div class="container">
            <div class="article-content">
                ${body}
                ${moral}
            </div>
        </div>
    </article>

    <footer class="footer">
        <div class="container">
            <div class="footer-bottom">
                <p>&copy; 2026 Yoruba Heritage. All rights reserved. | Built with respect for our ancestors</p>
                <p class="footer-legal"><a href="privacy.html">Privacy Policy</a> &nbsp;|&nbsp; <a href="terms.html">Terms of Use</a></p>
                <p class="footer-credit">Courtesy of <strong>Eletu</strong> &nbsp;|&nbsp; Created by <a href="https://www.origloballtd.com" target="_blank" rel="noopener">ORI Global Ltd</a></p>
            </div>
        </div>
    </footer>
    <script src="js/main.js"></script>
</body>
</html>
`;
}

// Write read/<section>/<slug>.html for every item; returns list of generated URL paths
function generateStaticDetailPages(results) {
    console.log('\n📄 Generating static detail pages...');
    const root = path.join(__dirname, 'read');
    fs.rmSync(root, { recursive: true, force: true });
    const urls = [];
    Object.keys(DETAIL_SECTIONS).forEach(key => {
        // Skip empty/untitled entries so we never publish blank pages
        const items = (results[key] || []).filter(i => i.title && (i.content || i.htmlContent)
            && (key !== 'odu-ifa' || isPublishableOdu(i)));
        const dir = path.join(root, DETAIL_SECTIONS[key].dir);
        fs.mkdirSync(dir, { recursive: true });
        const slugs = buildSlugMap(items);
        items.forEach(item => {
            const slug = slugs.get(item);
            fs.writeFileSync(path.join(dir, `${slug}.html`), renderDetailPage(key, item, slug));
            urls.push(staticDetailUrl(key, slug));
        });
        console.log(`  ✓ ${items.length} ${key} pages`);
    });
    return urls;
}

// Regenerate sitemap.xml from the fixed pages plus all generated detail pages
function writeSitemap(detailUrls) {
    const fixed = [
        ['', 'daily', '1.0'], ['articles.html', 'daily', '0.9'], ['stories.html', 'daily', '0.9'],
        ['ifa-wisdom.html', 'weekly', '0.8'], ['odu-ifa.html', 'weekly', '0.8'],
        ['events.html', 'weekly', '0.8'], ['news.html', 'daily', '0.8'],
        ['yoruba-calendar.html', 'monthly', '0.7'], ['gallery.html', 'weekly', '0.7'],
        ['diaspora.html', 'monthly', '0.6'], ['about.html', 'monthly', '0.6'],
        ['contact.html', 'monthly', '0.5'], ['contribute.html', 'monthly', '0.5'],
        ['search.html', 'monthly', '0.4'], ['privacy.html', 'yearly', '0.3'], ['terms.html', 'yearly', '0.3']
    ];
    const entry = (p, f, pr) => `  <url>\n    <loc>https://yorubaheritage.com/${p}</loc>\n    <changefreq>${f}</changefreq>\n    <priority>${pr}</priority>\n  </url>`;
    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        [...fixed.map(([p, f, pr]) => entry(p, f, pr)), ...detailUrls.map(u => entry(u, 'monthly', '0.6'))].join('\n') +
        '\n</urlset>\n';
    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml);
    console.log(`  ✓ sitemap.xml (${fixed.length + detailUrls.length} URLs)`);
}

// Generate feed.xml (RSS 2.0) of the newest articles and stories, for Buffer / Make.com
function writeFeed(results, detailUrlsBySection) {
    const SITE = 'https://yorubaheritage.com';
    const items = [];
    ['articles', 'stories'].forEach(key => {
        const list = (results[key] || []).filter(i => i.title && (i.content || i.htmlContent));
        const slugs = buildSlugMap(list);
        list.forEach(i => {
            const d = new Date(i.date);
            if (isNaN(d)) return;
            items.push({
                title: i.title,
                link: `${SITE}/${staticDetailUrl(key, slugs.get(i))}`,
                desc: toSentenceExcerpt(/[.!?…]$/.test(String(i.excerpt || '').trim()) ? i.excerpt : (i.htmlContent || i.content), 220),
                date: d,
                category: i.category || DETAIL_SECTIONS[key].label,
                image: i.image || 'images/uploads/yoruba-people.jpg'
            });
        });
    });
    items.sort((a, b) => b.date - a.date);
    const top = items.slice(0, 30);
    const absImg = img => !img ? '' : (/^https?:/.test(img) ? img : `${SITE}/${img.replace(/^\//, '')}`);
    const imgType = img => /\.png$/i.test(img) ? 'image/png' : /\.webp$/i.test(img) ? 'image/webp' : 'image/jpeg';
    const xmlItems = top.map(i => `    <item>
      <title>${escapeHtml(i.title)}</title>
      <link>${escapeHtml(i.link)}</link>
      <guid isPermaLink="true">${escapeHtml(i.link)}</guid>
      <pubDate>${i.date.toUTCString()}</pubDate>
      <category>${escapeHtml(i.category)}</category>
      <description>${escapeHtml(i.desc)}</description>${i.image ? `
      <enclosure url="${escapeHtml(absImg(i.image))}" length="0" type="${imgType(i.image)}" />` : ''}
    </item>`).join('\n');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Yoruba Heritage</title>
    <link>${SITE}/</link>
    <description>Articles and traditional stories celebrating Yoruba history, culture and wisdom.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
${xmlItems}
  </channel>
</rss>
`;
    fs.writeFileSync(path.join(__dirname, 'feed.xml'), xml);
    console.log(`  ✓ feed.xml (${top.length} items)`);
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

    // Generate full-text static detail pages + sitemap, then inject listing content
    const detailUrls = generateStaticDetailPages(results);
    writeSitemap(detailUrls);
    writeFeed(results);
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
