// Search Page JavaScript

// Combined data from all sections
const allContent = [
    // Articles
    { id: 1, type: 'article', category: 'History', title: 'The Oyo Empire: Rise and Fall of a West African Power', excerpt: 'The Oyo Empire was one of the most powerful and influential Yoruba kingdoms...', date: 'October 20, 2025', readTime: '8 min', url: 'articles.html#oyo-empire' },
    { id: 2, type: 'article', category: 'History', title: 'Ile-Ife: The Sacred City and Cradle of Yoruba Civilization', excerpt: 'Ile-Ife is considered the spiritual homeland of the Yoruba people...', date: 'October 18, 2025', readTime: '10 min', url: 'articles.html#ile-ife' },
    { id: 3, type: 'article', category: 'Culture', title: 'Yoruba Bronze and Terracotta Art: A Legacy of Excellence', excerpt: 'The artistic achievements of the Yoruba people in bronze casting...', date: 'October 15, 2025', readTime: '7 min', url: 'articles.html#art' },
    { id: 4, type: 'article', category: 'People', title: 'Queen Moremi: The Legendary Heroine of Ile-Ife', excerpt: 'Queen Moremi Ajasoro is celebrated as one of the most courageous figures...', date: 'October 12, 2025', readTime: '6 min', url: 'articles.html#moremi' },
    { id: 5, type: 'article', category: 'Language', title: 'The Yoruba Language: Tonal Beauty and Linguistic Structure', excerpt: 'Yoruba is a tonal language with a rich vocabulary...', date: 'October 10, 2025', readTime: '9 min', url: 'articles.html#language' },
    { id: 6, type: 'article', category: 'Diaspora', title: 'Yoruba Diaspora in Brazil: Candomblé and Cultural Preservation', excerpt: 'The Yoruba people in Brazil maintained their culture through Candomblé...', date: 'October 8, 2025', readTime: '8 min', url: 'articles.html#brazil' },
    
    // IFA Wisdom
    { id: 10, type: 'wisdom', category: 'IFA', title: 'Understanding IFA: The Ancient Oracle System', excerpt: 'IFA is a complex divination system that has guided Yoruba people for centuries...', date: 'October 18, 2025', readTime: '12 min', url: 'ifa-wisdom.html#oracle' },
    { id: 11, type: 'wisdom', category: 'IFA', title: 'The 256 Odu IFA: Sacred Verses of Wisdom', excerpt: 'Learn about the Odu IFA, the sacred verses that form the foundation of divination...', date: 'October 14, 2025', readTime: '15 min', url: 'ifa-wisdom.html#odu' },
    { id: 12, type: 'wisdom', category: 'IFA', title: 'Orunmila: The Deity of Wisdom and Divination', excerpt: 'Discover Orunmila, the Orisha of wisdom who witnessed creation...', date: 'October 11, 2025', readTime: '10 min', url: 'ifa-wisdom.html#orunmila' },
    { id: 13, type: 'wisdom', category: 'IFA', title: 'The Role of Babalawo in Yoruba Society', excerpt: 'Babalawos are priests of IFA who serve as spiritual guides and counselors...', date: 'October 7, 2025', readTime: '8 min', url: 'ifa-wisdom.html#babalawo' },
    
    // Stories
    { id: 20, type: 'story', category: 'Folklore', title: 'The Tortoise and the Birds: A Tale of Cunning', excerpt: 'A classic Yoruba folktale about Ijapa (tortoise) and his clever schemes...', date: 'October 16, 2025', readTime: '5 min', url: 'stories.html#tortoise' },
    { id: 21, type: 'story', category: 'Folklore', title: 'How Death Came Into the World', excerpt: 'An ancient story explaining the Yoruba understanding of mortality...', date: 'October 13, 2025', readTime: '7 min', url: 'stories.html#death' },
    { id: 22, type: 'story', category: 'Legends', title: 'The Legend of Oduduwa: Founder of Ile-Ife', excerpt: 'The sacred story of Oduduwa descending from heaven to create the world...', date: 'October 9, 2025', readTime: '8 min', url: 'stories.html#oduduwa' },
    { id: 23, type: 'story', category: 'Myths', title: 'Sango and His Three Wives', excerpt: 'The dramatic tale of Sango, the god of thunder, and his relationships...', date: 'October 5, 2025', readTime: '6 min', url: 'stories.html#sango' },
    
    // Orisha Content
    { id: 30, type: 'article', category: 'Spirituality', title: 'The Orisha: Divine Forces in Yoruba Religion', excerpt: 'Explore the pantheon of Orisha, the divine beings who govern various aspects of life...', date: 'October 17, 2025', readTime: '11 min', url: 'articles.html#orisha' },
    { id: 31, type: 'article', category: 'Spirituality', title: 'Osun: Goddess of Love, Beauty, and Rivers', excerpt: 'Learn about Osun, one of the most beloved Orisha, and her annual festival...', date: 'October 6, 2025', readTime: '9 min', url: 'articles.html#osun' },
    { id: 32, type: 'article', category: 'Spirituality', title: 'Ogun: The Warrior God of Iron and Technology', excerpt: 'Ogun is the Orisha of iron, war, and technological innovation...', date: 'October 3, 2025', readTime: '8 min', url: 'articles.html#ogun' },
];

// DOM Elements
const mainSearch = document.getElementById('mainSearch');
const searchBtn = document.querySelector('.search-btn');
const searchResults = document.getElementById('searchResults');
const resultsGrid = document.getElementById('resultsGrid');
const resultsCount = document.getElementById('resultsCount');
const filterTags = document.querySelectorAll('.tag');

// Perform search
function performSearch(query) {
    if (!query.trim()) {
        searchResults.style.display = 'none';
        return;
    }
    
    const searchTerm = query.toLowerCase();
    const filtered = allContent.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.excerpt.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
    
    displayResults(filtered, query);
}

// Display search results
function displayResults(results, query) {
    searchResults.style.display = 'block';
    
    // Scroll to results
    searchResults.scrollIntoView({ behavior: 'smooth' });
    
    if (results.length === 0) {
        resultsCount.textContent = `No results found for "${query}"`;
        resultsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No results found</h3>
                <p>Try using different keywords or browse our categories below</p>
            </div>
        `;
        return;
    }
    
    resultsCount.textContent = `Found ${results.length} result${results.length > 1 ? 's' : ''} for "${query}"`;
    resultsGrid.innerHTML = '';
    
    results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        
        resultItem.innerHTML = `
            <span class="result-category">${item.category}</span>
            <h3>${highlightText(item.title, query)}</h3>
            <p>${highlightText(item.excerpt, query)}</p>
            <div class="result-meta">
                <span><i class="far fa-calendar"></i> ${item.date}</span>
                <span><i class="far fa-clock"></i> ${item.readTime} read</span>
                <span><i class="fas fa-tag"></i> ${item.type}</span>
            </div>
            <a href="${item.url}" class="result-link">
                Read More <i class="fas fa-arrow-right"></i>
            </a>
        `;
        
        resultsGrid.appendChild(resultItem);
    });
    
    animateResults();
}

// Highlight search terms in text
function highlightText(text, query) {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background: #FFE5B4; padding: 0 2px;">$1</mark>');
}

// Animate results
function animateResults() {
    const items = document.querySelectorAll('.result-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 80);
    });
}

// Event listeners
searchBtn.addEventListener('click', () => {
    performSearch(mainSearch.value);
});

mainSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch(mainSearch.value);
    }
});

// Quick filter tags
filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
        const query = tag.getAttribute('data-query');
        mainSearch.value = query;
        performSearch(query);
    });
});

// Check for query parameter on page load
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
        mainSearch.value = query;
        performSearch(query);
    }
});
