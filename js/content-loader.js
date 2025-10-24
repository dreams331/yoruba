/**
 * Content Loader
 * 
 * This module provides functions to load content from the CMS-generated JSON files.
 * It merges CMS content with any existing hardcoded data.
 */

// Cache for loaded content
const contentCache = {
    articles: null,
    stories: null,
    ifa: null,
    gallery: null,
    pages: null
};

/**
 * Load JSON content from the data directory
 * @param {string} type - The content type (articles, stories, ifa, gallery, pages)
 * @returns {Promise<Array>} The loaded content array
 */
async function loadContent(type) {
    // Return cached content if available
    if (contentCache[type]) {
        return contentCache[type];
    }
    
    try {
        const response = await fetch(`/data/${type}.json`);
        if (!response.ok) {
            console.warn(`Could not load ${type}.json, using fallback data`);
            return [];
        }
        const data = await response.json();
        contentCache[type] = data;
        return data;
    } catch (error) {
        console.error(`Error loading ${type}:`, error);
        return [];
    }
}

/**
 * Transform CMS article to match the expected format
 * @param {Object} cmsArticle - Article from CMS JSON
 * @param {number} index - Index for generating numeric ID
 * @returns {Object} Transformed article
 */
function transformArticle(cmsArticle, index) {
    return {
        id: index + 1, // Numeric ID for backwards compatibility
        slug: cmsArticle.id, // Keep the slug-based ID
        title: cmsArticle.title,
        category: cmsArticle.category || 'general',
        date: formatDate(cmsArticle.date),
        readTime: cmsArticle.readTime || '5 min',
        excerpt: cmsArticle.excerpt || '',
        image: cmsArticle.image || 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
        content: cmsArticle.htmlContent || cmsArticle.content || '',
        featured: cmsArticle.featured || false,
        tags: cmsArticle.tags || []
    };
}

/**
 * Transform CMS story to match the expected format
 */
function transformStory(cmsStory, index) {
    return {
        id: index + 1,
        slug: cmsStory.id,
        title: cmsStory.title,
        category: cmsStory.category || 'folktales',
        date: formatDate(cmsStory.date),
        readTime: cmsStory.readTime || '5 min',
        excerpt: cmsStory.excerpt || '',
        image: cmsStory.image || 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=800',
        content: cmsStory.htmlContent || cmsStory.content || '',
        moral: cmsStory.moral || ''
    };
}

/**
 * Transform CMS IFA content to match the expected format
 */
function transformIfa(cmsIfa, index) {
    return {
        id: index + 1,
        slug: cmsIfa.id,
        title: cmsIfa.title,
        category: cmsIfa.category || 'IFA Basics',
        date: formatDate(cmsIfa.date),
        readTime: cmsIfa.readTime || '10 min',
        excerpt: cmsIfa.excerpt || '',
        image: cmsIfa.image || 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=800',
        content: cmsIfa.htmlContent || cmsIfa.content || ''
    };
}

/**
 * Format date string to readable format
 */
function formatDate(dateString) {
    if (!dateString) return 'No date';
    
    try {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    } catch (error) {
        return dateString;
    }
}

/**
 * Merge CMS content with fallback data
 * @param {Array} cmsData - Data from CMS
 * @param {Array} fallbackData - Fallback hardcoded data
 * @param {Function} transformer - Function to transform CMS items
 * @returns {Array} Merged content
 */
function mergeContent(cmsData, fallbackData, transformer) {
    // Transform CMS data
    const transformedCms = cmsData.map((item, index) => transformer(item, index));
    
    // If we have CMS data, use it; otherwise use fallback
    if (transformedCms.length > 0) {
        // Merge with fallback, avoiding duplicates
        const combined = [...transformedCms];
        
        // Add fallback items that don't exist in CMS
        fallbackData.forEach(fallbackItem => {
            const exists = transformedCms.some(cmsItem => 
                cmsItem.title === fallbackItem.title
            );
            if (!exists) {
                combined.push(fallbackItem);
            }
        });
        
        return combined;
    }
    
    return fallbackData;
}

/**
 * Get all articles (CMS + fallback)
 */
async function getArticles(fallbackData = []) {
    const cmsArticles = await loadContent('articles');
    return mergeContent(cmsArticles, fallbackData, transformArticle);
}

/**
 * Get all stories (CMS + fallback)
 */
async function getStories(fallbackData = []) {
    const cmsStories = await loadContent('stories');
    return mergeContent(cmsStories, fallbackData, transformStory);
}

/**
 * Get all IFA content (CMS + fallback)
 */
async function getIfa(fallbackData = []) {
    const cmsIfa = await loadContent('ifa');
    return mergeContent(cmsIfa, fallbackData, transformIfa);
}

/**
 * Get a single article by ID or slug
 */
async function getArticleById(id, fallbackData = []) {
    const articles = await getArticles(fallbackData);
    
    // Try to find by numeric ID first
    let article = articles.find(a => a.id === parseInt(id));
    
    // If not found, try by slug
    if (!article) {
        article = articles.find(a => a.slug === id);
    }
    
    return article || null;
}

/**
 * Get a single story by ID or slug
 */
async function getStoryById(id, fallbackData = []) {
    const stories = await getStories(fallbackData);
    
    let story = stories.find(s => s.id === parseInt(id));
    if (!story) {
        story = stories.find(s => s.slug === id);
    }
    
    return story || null;
}

/**
 * Clear content cache (useful when content is updated)
 */
function clearCache() {
    Object.keys(contentCache).forEach(key => {
        contentCache[key] = null;
    });
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadContent,
        getArticles,
        getStories,
        getIfa,
        getArticleById,
        getStoryById,
        clearCache
    };
}
