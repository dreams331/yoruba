// Articles Page JavaScript

// Sample articles data - Fallback data if CMS content is not available
const fallbackArticlesData = [
    {
        id: 1,
        title: "The Oyo Empire: Rise and Fall of a West African Power",
        category: "history",
        date: "October 20, 2025",
        readTime: "8 min",
        excerpt: "The Oyo Empire was one of the most powerful and influential Yoruba kingdoms, dominating West Africa from the 14th to the 19th century. Explore its military prowess, political structure, and ultimate decline.",
        image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
        content: "Full article content here..."
    },
    {
        id: 2,
        title: "Ile-Ife: The Sacred City and Cradle of Yoruba Civilization",
        category: "history",
        date: "October 18, 2025",
        readTime: "10 min",
        excerpt: "Ile-Ife is considered the spiritual homeland of the Yoruba people and the legendary birthplace of humanity according to Yoruba mythology. Discover the archaeological wonders and spiritual significance of this ancient city.",
        image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800",
        content: "Full article content here..."
    },
    {
        id: 3,
        title: "Yoruba Bronze and Terracotta Art: A Legacy of Excellence",
        category: "culture",
        date: "October 15, 2025",
        readTime: "7 min",
        excerpt: "The artistic achievements of the Yoruba people, particularly in bronze casting and terracotta sculpture, rival any civilization in world history. Learn about the techniques and cultural significance of these masterpieces.",
        image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800",
        content: "Full article content here..."
    },
    {
        id: 4,
        title: "Queen Moremi: The Legendary Heroine of Ile-Ife",
        category: "people",
        date: "October 12, 2025",
        readTime: "6 min",
        excerpt: "Queen Moremi Ajasoro is celebrated as one of the most courageous figures in Yoruba history. Her sacrifice and bravery saved the people of Ile-Ife from enslavement and destruction.",
        image: "https://images.unsplash.com/photo-1594608661720-5596a37ab0cb?w=800",
        content: "Full article content here..."
    },
    {
        id: 5,
        title: "The Yoruba Language: Tonal Beauty and Linguistic Structure",
        category: "language",
        date: "October 10, 2025",
        readTime: "9 min",
        excerpt: "Yoruba is a tonal language with a rich vocabulary and complex grammatical structure. Explore its linguistic features, dialects, and influence on other languages across the diaspora.",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
        content: "Full article content here..."
    },
    {
        id: 6,
        title: "Yoruba Diaspora in Brazil: Candomblé and Cultural Preservation",
        category: "diaspora",
        date: "October 8, 2025",
        readTime: "8 min",
        excerpt: "The Yoruba people forcibly taken to Brazil during the transatlantic slave trade maintained their culture through Candomblé and other traditions. Discover how Yoruba culture thrives in modern Brazil.",
        image: "https://images.unsplash.com/photo-1516306580977-bd7e34a1f04e?w=800",
        content: "Full article content here..."
    },
    {
        id: 7,
        title: "Sango: The Thunder God and Fourth Alafin of Oyo",
        category: "people",
        date: "October 5, 2025",
        readTime: "7 min",
        excerpt: "Sango was a historical king of Oyo who was deified after his death. Learn about his life as a warrior king and his enduring legacy as the Orisha of thunder and lightning.",
        image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800",
        content: "Full article content here..."
    },
    {
        id: 8,
        title: "Eyo Festival: The Grandest Lagos Tradition",
        category: "culture",
        date: "October 3, 2025",
        readTime: "6 min",
        excerpt: "The Eyo Festival is one of the most spectacular cultural events in Lagos, Nigeria. Discover its origins, symbolism, and the mystique of the white-robed Eyo masquerades.",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
        content: "Full article content here..."
    },
    {
        id: 9,
        title: "Yoruba Political Systems: Oba, Chiefs, and Democracy",
        category: "history",
        date: "October 1, 2025",
        readTime: "10 min",
        excerpt: "The traditional Yoruba political system features a sophisticated balance of power between the Oba (king), council of chiefs, and the people. Explore this early form of democratic governance.",
        image: "https://images.unsplash.com/photo-1541872703-74c34d9d3fb8?w=800",
        content: "Full article content here..."
    },
    {
        id: 10,
        title: "Wole Soyinka: Africa's First Nobel Laureate in Literature",
        category: "people",
        date: "September 28, 2025",
        readTime: "9 min",
        excerpt: "Wole Soyinka, a Yoruba playwright and poet, became the first African to win the Nobel Prize in Literature in 1986. Examine his literary contributions and political activism.",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
        content: "Full article content here..."
    },
    {
        id: 11,
        title: "Yoruba Proverbs: Wisdom in Ancient Sayings",
        category: "language",
        date: "September 25, 2025",
        readTime: "5 min",
        excerpt: "Yoruba proverbs (Owe) are philosophical statements that convey deep wisdom. Learn about the most important proverbs and their meanings in contemporary life.",
        image: "https://images.unsplash.com/photo-1476357471311-43c0db9fb2b4?w=800",
        content: "Full article content here..."
    },
    {
        id: 12,
        title: "Santería in Cuba: Yoruba Religion in the Caribbean",
        category: "diaspora",
        date: "September 22, 2025",
        readTime: "8 min",
        excerpt: "Santería emerged in Cuba as a syncretic religion combining Yoruba beliefs with Catholicism. Discover how the Orishas survived and thrived in the New World.",
        image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800",
        content: "Full article content here..."
    },
    {
        id: 13,
        title: "Traditional Yoruba Architecture: Beauty and Functionality",
        category: "culture",
        date: "September 20, 2025",
        readTime: "7 min",
        excerpt: "Yoruba architecture features intricate designs, carved pillars, and courtyard layouts. Explore the aesthetic and practical elements of traditional Yoruba buildings.",
        image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800",
        content: "Full article content here..."
    },
    {
        id: 14,
        title: "The Alaafin: Spiritual and Political Authority in Oyo",
        category: "history",
        date: "September 18, 2025",
        readTime: "8 min",
        excerpt: "The Alaafin of Oyo holds one of the most prestigious traditional titles in Yorubaland. Learn about the role, powers, and succession of this important position.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
        content: "Full article content here..."
    },
    {
        id: 15,
        title: "Yoruba Naming Ceremonies: Celebrating New Life",
        category: "culture",
        date: "September 15, 2025",
        readTime: "6 min",
        excerpt: "The naming ceremony (Isomoloruko) is a joyous celebration marking a child's introduction to the world. Discover the rituals, prayers, and significance of Yoruba names.",
        image: "https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=800",
        content: "Full article content here..."
    }
];

// DOM Elements
const articlesGrid = document.getElementById('articlesGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('articleSearch');

// Current filter state
let currentFilter = 'all';
let searchTerm = '';

// Display articles
function displayArticles(articles) {
    if (articles.length === 0) {
        articlesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No articles found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    articlesGrid.innerHTML = '';
    
    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'article-card';
        card.setAttribute('data-category', article.category);
        
        card.innerHTML = `
            <div class="article-image">
                ${article.image ? 
                    `<img src="${article.image}" alt="${article.title}">` : 
                    '<div style="width:100%;height:100%;background:linear-gradient(135deg, var(--primary-color), var(--secondary-color));"></div>'
                }
                <span class="article-category">${getCategoryLabel(article.category)}</span>
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span><i class="far fa-calendar"></i> ${article.date}</span>
                    <span><i class="far fa-clock"></i> ${article.readTime} read</span>
                </div>
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <a href="article-detail.html?id=${article.id}" class="article-link">
                    Read Full Article <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        
        articlesGrid.appendChild(card);
    });
    
    // Apply fade-in animation
    animateCards();
}

// Get category label
function getCategoryLabel(category) {
    const labels = {
        'history': 'History',
        'culture': 'Culture',
        'people': 'Notable Figures',
        'diaspora': 'Diaspora',
        'language': 'Language'
    };
    return labels[category] || category;
}

// Filter articles
function filterArticles() {
    let filtered = articlesData;
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(article => article.category === currentFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(article => 
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    displayArticles(filtered);
}

// Event listeners for filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update filter
        currentFilter = btn.getAttribute('data-category');
        filterArticles();
    });
});

// Event listener for search
searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    filterArticles();
});

// Animate cards
function animateCards() {
    const cards = document.querySelectorAll('.article-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize
let articlesData = fallbackArticlesData;

// Load content from CMS
async function initializeArticles() {
    try {
        // Load articles from CMS (this function is defined in content-loader.js)
        if (typeof getArticles === 'function') {
            articlesData = await getArticles(fallbackArticlesData);
            console.log(`✓ Loaded ${articlesData.length} articles from CMS`);
        }
    } catch (error) {
        console.warn('Using fallback articles data:', error);
        articlesData = fallbackArticlesData;
    }
    
    // Display the articles
    displayArticles(articlesData);
}

// Start initialization
initializeArticles();
