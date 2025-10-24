#!/usr/bin/env node

/**
 * Watch Content Script
 * 
 * This script watches the content directory for changes and automatically
 * rebuilds the JSON files when markdown files are added, modified, or deleted.
 * 
 * Run with: node watch-content.js
 */

const fs = require('fs');
const path = require('path');
const { buildContent } = require('./build-content.js');

const contentDir = path.join(__dirname, 'content');

console.log('👀 Watching content directory for changes...\n');
console.log(`Watching: ${contentDir}`);
console.log('Press Ctrl+C to stop\n');

// Initial build
buildContent();

// Watch for changes
const watchOptions = { recursive: true };

fs.watch(contentDir, watchOptions, (eventType, filename) => {
    if (filename && filename.endsWith('.md')) {
        console.log(`\n📝 Detected change: ${filename} (${eventType})`);
        console.log('🔄 Rebuilding content...\n');
        
        try {
            buildContent();
        } catch (error) {
            console.error('❌ Build error:', error.message);
        }
    }
});

console.log('✓ Watcher started successfully\n');
