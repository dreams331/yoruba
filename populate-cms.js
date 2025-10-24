#!/usr/bin/env node

/**
 * Populate CMS Content Script
 * 
 * This script creates Markdown files for all the fallback content
 * so it appears in the CMS for easy editing.
 */

const fs = require('fs');
const path = require('path');

// Load the articles data
const articlesData = [
    {
        id: 1,
        title: "The Oyo Empire: Rise and Fall of a West African Power",
        category: "history",
        date: "October 20, 2025",
        readTime: "8 min",
        excerpt: "The Oyo Empire was one of the most powerful and influential Yoruba kingdoms, dominating West Africa from the 14th to the 19th century. Explore its military prowess, political structure, and ultimate decline.",
        image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
    },
    {
        id: 2,
        title: "Ile-Ife: The Sacred City and Cradle of Yoruba Civilization",
        category: "history",
        date: "October 18, 2025",
        readTime: "10 min",
        excerpt: "Ile-Ife is considered the spiritual homeland of the Yoruba people and the legendary birthplace of humanity according to Yoruba mythology. Discover the archaeological wonders and spiritual significance of this ancient city.",
        image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800",
    },
    {
        id: 3,
        title: "Yoruba Bronze and Terracotta Art: A Legacy of Excellence",
        category: "culture",
        date: "October 15, 2025",
        readTime: "7 min",
        excerpt: "The artistic achievements of the Yoruba people, particularly in bronze casting and terracotta sculpture, rival any civilization in world history. Learn about the techniques and cultural significance of these masterpieces.",
        image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800",
    },
    {
        id: 4,
        title: "Queen Moremi: The Legendary Heroine of Ile-Ife",
        category: "people",
        date: "October 12, 2025",
        readTime: "6 min",
        excerpt: "Queen Moremi Ajasoro is celebrated as one of the most courageous figures in Yoruba history. Her sacrifice and bravery saved the people of Ile-Ife from enslavement and destruction.",
        image: "https://images.unsplash.com/photo-1594608661720-5596a37ab0cb?w=800",
    },
    {
        id: 5,
        title: "The Yoruba Language: Tonal Beauty and Linguistic Structure",
        category: "language",
        date: "October 10, 2025",
        readTime: "9 min",
        excerpt: "Yoruba is a tonal language with a rich vocabulary and complex grammatical structure. Explore its linguistic features, dialects, and influence on other languages across the diaspora.",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
    },
    {
        id: 6,
        title: "Yoruba Diaspora in Brazil: Candomblé and Cultural Preservation",
        category: "diaspora",
        date: "October 8, 2025",
        readTime: "8 min",
        excerpt: "The Yoruba people forcibly taken to Brazil during the transatlantic slave trade maintained their culture through Candomblé and other traditions. Discover how Yoruba culture thrives in modern Brazil.",
        image: "https://images.unsplash.com/photo-1516306580977-bd7e34a1f04e?w=800",
    },
    {
        id: 7,
        title: "Sango: The Thunder God and Fourth Alafin of Oyo",
        category: "people",
        date: "October 5, 2025",
        readTime: "7 min",
        excerpt: "Sango was a historical king of Oyo who was deified after his death. Learn about his life as a warrior king and his enduring legacy as the Orisha of thunder and lightning.",
        image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800",
    },
    {
        id: 8,
        title: "Eyo Festival: The Grandest Lagos Tradition",
        category: "culture",
        date: "October 3, 2025",
        readTime: "6 min",
        excerpt: "The Eyo Festival is one of the most spectacular cultural events in Lagos, Nigeria. Discover its origins, symbolism, and the mystique of the white-robed Eyo masquerades.",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    },
    {
        id: 9,
        title: "Yoruba Political Systems: Oba, Chiefs, and Democracy",
        category: "history",
        date: "October 1, 2025",
        readTime: "10 min",
        excerpt: "The traditional Yoruba political system features a sophisticated balance of power between the Oba (king), council of chiefs, and the people. Explore this early form of democratic governance.",
        image: "https://images.unsplash.com/photo-1541872703-74c34d9d3fb8?w=800",
    },
    {
        id: 10,
        title: "Wole Soyinka: Africa's First Nobel Laureate in Literature",
        category: "people",
        date: "September 28, 2025",
        readTime: "9 min",
        excerpt: "Wole Soyinka made history in 1986 as the first African to win the Nobel Prize in Literature. Explore his life, works, and impact on African and world literature.",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
    },
    {
        id: 11,
        title: "Traditional Yoruba Architecture: Beauty in Function",
        category: "culture",
        date: "September 25, 2025",
        readTime: "7 min",
        excerpt: "Yoruba architecture features distinctive compounds, carved pillars, and practical designs suited to the tropical climate. Discover the aesthetics and engineering of traditional Yoruba buildings.",
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
    },
    {
        id: 12,
        title: "Yoruba Naming Ceremonies: Celebrating New Life",
        category: "culture",
        date: "September 22, 2025",
        readTime: "6 min",
        excerpt: "The naming ceremony (Isomoloruko) is a significant tradition where a child receives their name eight days after birth. Learn about this beautiful celebration of life and identity.",
        image: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800",
    }
];

const storiesData = [
    {
        id: 1,
        title: "The Tortoise and the Birds: Ijapa's Clever Scheme",
        category: "folktales",
        date: "October 20, 2025",
        readTime: "5 min",
        excerpt: "Learn how Ijapa the tortoise tricked the birds to attend a feast in the sky, and how his greed led to his downfall. A classic tale teaching the dangers of deceit and selfishness.",
        moral: "Greed and deception ultimately lead to one's downfall."
    },
    {
        id: 2,
        title: "How Death Came Into the World",
        category: "myths",
        date: "October 18, 2025",
        readTime: "7 min",
        excerpt: "An ancient Yoruba creation story explaining how death became a part of human existence. Discover the cosmic drama between Olodumare and humanity's eternal quest for immortality.",
        moral: "Some changes, once set in motion, cannot be undone."
    },
    {
        id: 3,
        title: "The Legend of Oduduwa: Creating the World",
        category: "legends",
        date: "October 16, 2025",
        readTime: "8 min",
        excerpt: "The sacred story of how Oduduwa descended from heaven with a chain, carrying a handful of earth, a cockerel, and a palm nut to create the land at Ile-Ife.",
        moral: "Every great journey begins with divine purpose and careful preparation."
    }
];

function createSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString();
}

function createArticleMarkdown(article) {
    const slug = createSlug(article.title);
    const date = formatDate(article.date);
    
    return `---
title: "${article.title}"
date: ${date}
category: "${article.category}"
image: ${article.image || 'null'}
excerpt: "${article.excerpt}"
readTime: "${article.readTime}"
featured: false
tags: []
---

## Introduction

${article.excerpt}

## Main Content

*This article was migrated from the original site. Please expand and enhance the content using the CMS editor.*

Add your detailed content here. Include:
- Historical context
- Key figures and events
- Cultural significance
- Modern relevance
- Additional insights

## Conclusion

*Add a compelling conclusion that ties together the themes of the article.*
`;
}

function createStoryMarkdown(story) {
    const slug = createSlug(story.title);
    const date = formatDate(story.date);
    
    return `---
title: "${story.title}"
date: ${date}
category: "${story.category}"
image: null
excerpt: "${story.excerpt}"
readTime: "${story.readTime}"
moral: "${story.moral || ''}"
---

## The Story

${story.excerpt}

*This story was migrated from the original site. Please expand with the full narrative using the CMS editor.*

Add the complete story here, including:
- Setting and characters
- The main conflict or challenge
- How the story unfolds
- The resolution
- The lesson learned

## The Moral

${story.moral || 'Add the moral of the story here.'}
`;
}

function populateContent() {
    console.log('📝 Populating CMS with existing content...\n');
    
    const contentDir = path.join(__dirname, 'content');
    const articlesDir = path.join(contentDir, 'articles');
    const storiesDir = path.join(contentDir, 'stories');
    
    // Create directories if they don't exist
    [articlesDir, storiesDir].forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
    
    let created = 0;
    let skipped = 0;
    
    // Create article files
    console.log('Creating article files...');
    articlesData.forEach(article => {
        const slug = createSlug(article.title);
        const filename = `2025-10-${String(article.id).padStart(2, '0')}-${slug}.md`;
        const filepath = path.join(articlesDir, filename);
        
        if (fs.existsSync(filepath)) {
            console.log(`  ⊘ Skipped (exists): ${filename}`);
            skipped++;
        } else {
            const content = createArticleMarkdown(article);
            fs.writeFileSync(filepath, content);
            console.log(`  ✓ Created: ${filename}`);
            created++;
        }
    });
    
    // Create story files
    console.log('\nCreating story files...');
    storiesData.forEach(story => {
        const slug = createSlug(story.title);
        const filename = `2025-10-${String(story.id).padStart(2, '0')}-${slug}.md`;
        const filepath = path.join(storiesDir, filename);
        
        if (fs.existsSync(filepath)) {
            console.log(`  ⊘ Skipped (exists): ${filename}`);
            skipped++;
        } else {
            const content = createStoryMarkdown(story);
            fs.writeFileSync(filepath, content);
            console.log(`  ✓ Created: ${filename}`);
            created++;
        }
    });
    
    console.log('\n📊 Summary:');
    console.log(`  Created: ${created} files`);
    console.log(`  Skipped: ${skipped} files (already exist)`);
    console.log('\n✅ Content population complete!');
    console.log('\n💡 Next steps:');
    console.log('  1. Run: npm run build');
    console.log('  2. Refresh your site to see all content');
    console.log('  3. Access CMS at /admin to edit content\n');
}

// Run the population
if (require.main === module) {
    try {
        populateContent();
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

module.exports = { populateContent };
