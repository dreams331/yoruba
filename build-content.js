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
    
    // Generate an ID from the filename
    const filename = path.basename(filePath, '.md');
    const id = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/-/g, '_');
    
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
        { name: 'pages', dir: path.join(contentDir, 'pages') }
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
