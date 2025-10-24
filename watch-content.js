#!/usr/bin/env node

/**
 * Watch Content Script
 * 
 * This script watches the content directory for changes and automatically
 * rebuilds the JSON files when markdown files are added, modified, or deleted.
 * 
 * Run with: node watch-content.js or npm run dev
 */

const fs = require('fs');
const path = require('path');
const { buildContent } = require('./build-content.js');

const contentDir = path.join(__dirname, 'content');

console.log('👀 Watching content directory for changes...\n');
console.log(`Watching: ${contentDir}`);
console.log('📝 Any new .md files will trigger automatic rebuild');
console.log('💡 Create content in CMS or manually add .md files');
console.log('⚡ Changes detected automatically - no manual build needed!');
console.log('Press Ctrl+C to stop\n');

// Initial build
console.log('🔨 Running initial build...\n');
buildContent();

// Debounce function to avoid multiple rapid rebuilds
let buildTimeout = null;
function debouncedBuild(filename, eventType) {
    clearTimeout(buildTimeout);
    buildTimeout = setTimeout(() => {
        console.log(`\n📝 Detected change: ${filename} (${eventType})`);
        console.log('🔄 Rebuilding content...\n');
        
        try {
            buildContent();
            console.log('\n✅ Auto-rebuild complete! Refresh your browser to see changes.\n');
        } catch (error) {
            console.error('❌ Build error:', error.message);
        }
    }, 500); // Wait 500ms after last change
}

// Watch for changes
const watchOptions = { recursive: true };

fs.watch(contentDir, watchOptions, (eventType, filename) => {
    if (filename && filename.endsWith('.md')) {
        debouncedBuild(filename, eventType);
    }
});

console.log('✓ Watcher started successfully\n');
console.log('═'.repeat(60));
console.log('NOW WATCHING FOR CHANGES - AUTO-BUILD ENABLED');
console.log('═'.repeat(60));
console.log('\n💡 TIP: Keep this running while you work!\n');
