// Article Detail Page JavaScript

// Sample full article content database - Fallback data
const fallbackFullArticlesData = {
    1: {
        title: "The Oyo Empire: Rise and Fall of a West African Power",
        category: "History",
        date: "October 20, 2025",
        readTime: "8 min",
        image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200",
        content: `
            <h2>The Rise of Oyo</h2>
            <p>The Oyo Empire emerged as a dominant force in West Africa during the 14th century, establishing itself as one of the most sophisticated and powerful kingdoms in the region. Located in what is now southwestern Nigeria, the empire's influence extended far beyond its immediate territory, reaching as far as modern-day Benin Republic and Togo.</p>

            <p>The foundation of Oyo's power rested on several pillars: military might, economic prosperity, political sophistication, and cultural richness. At its zenith in the 17th and 18th centuries, the Oyo Empire controlled an area that covered approximately 150,000 square kilometers.</p>

            <h2>Military Excellence</h2>
            <p>The Oyo military machine was renowned throughout West Africa, particularly for its cavalry units. Unlike many neighboring kingdoms limited by the tsetse fly-infested forests, Oyo's location in the savanna grasslands allowed for the effective use of horses imported from the north through trans-Saharan trade routes.</p>

            <h3>Military Organization</h3>
            <ul>
                <li><strong>Elite Cavalry (Eso):</strong> The backbone of Oyo's military, comprising nobles and professional warriors</li>
                <li><strong>Infantry Units:</strong> Organized into regional battalions, each with specialized roles</li>
                <li><strong>Strategic Fortifications:</strong> A network of defensive walls and garrison towns</li>
                <li><strong>Intelligence Network:</strong> Sophisticated spy systems in vassal territories</li>
            </ul>

            <p>The Oyo cavalry could deploy rapidly across vast distances, a capability that proved decisive in numerous conflicts. Military campaigns were carefully planned, often timed to coincide with the dry season when movement was easier.</p>

            <h2>Political Structure</h2>
            <p>The Oyo political system represented one of the most sophisticated governmental structures in pre-colonial Africa. Power was carefully balanced between multiple institutions to prevent tyranny while ensuring effective governance.</p>

            <h3>Key Political Institutions:</h3>
            <p><strong>1. The Alaafin (King):</strong> The divine ruler considered the spiritual and temporal leader. However, unlike absolute monarchs elsewhere, the Alaafin's power was checked by other institutions.</p>

            <p><strong>2. The Oyomesi:</strong> A council of seven high chiefs, the king-makers who selected new Alaafins and could force an unworthy ruler to commit suicide by presenting him with an empty calabash or parrot's eggs.</p>

            <p><strong>3. The Ogboni Society:</strong> A powerful secret society that served as a check on both the Alaafin and the Oyomesi, representing the earth cult and the common people's interests.</p>

            <p><strong>4. The Bashorun:</strong> The prime minister and head of the Oyomesi, who wielded enormous power and sometimes rivaled the Alaafin himself.</p>

            <p><strong>5. Provincial Administration:</strong> The empire was divided into metropolitan Oyo and provincial territories, each governed by appointed officials answerable to the center.</p>

            <h2>Economic Foundation</h2>
            <p>Oyo's wealth derived from multiple sources that made it one of the richest kingdoms in West Africa:</p>

            <h3>Trade Networks:</h3>
            <p>The empire controlled crucial north-south trade routes connecting the Sahel with the Atlantic coast. Key commodities included:</p>
            <ul>
                <li>Kola nuts from the forest regions to the north</li>
                <li>Salt from coastal areas</li>
                <li>Textiles and leather goods</li>
                <li>Horses and livestock</li>
                <li>Iron tools and weapons</li>
            </ul>

            <h3>Tribute System:</h3>
            <p>Vassal states paid annual tributes in goods, currency (cowries), and sometimes people. This system enriched the imperial treasury while binding dependencies to Oyo.</p>

            <h3>Agriculture:</h3>
            <p>The fertile lands supported large-scale farming of yams, maize, and other crops. Agricultural surplus supported the non-farming population and enabled urbanization.</p>

            <h2>Cultural Achievements</h2>
            <p>Beyond political and military prowess, Oyo was a cultural powerhouse that shaped Yoruba civilization.</p>

            <h3>Art and Architecture:</h3>
            <ul>
                <li>Elaborate palaces with intricate carved pillars and decorated walls</li>
                <li>Bronze and brass casting traditions</li>
                <li>Textile arts, including the famous Aso-Oke cloth</li>
                <li>Beadwork and ceremonial regalia</li>
            </ul>

            <h3>Oral Literature:</h3>
            <p>Oyo was home to renowned poets, drummers (who "spoke" through their drums), and storytellers. The oral traditions preserved historical narratives, philosophical teachings, and moral lessons that continue to influence Yoruba culture today.</p>

            <h3>Religious Innovation:</h3>
            <p>While maintaining traditional Yoruba religious practices, Oyo developed unique spiritual traditions, festivals, and ceremonies that spread throughout the empire and beyond.</p>

            <h2>The Seeds of Decline</h2>
            <p>By the late 18th century, multiple factors began undermining Oyo's dominance:</p>

            <h3>Internal Conflicts:</h3>
            <p>Succession disputes became increasingly violent as powerful chiefs (especially the Bashorun) manipulated the selection of Alaafins. Some reigns lasted mere months before the ruler was forced to commit suicide.</p>

            <h3>Vassal Rebellions:</h3>
            <p>The Egba, Dahomey (modern Benin), and other subject peoples increasingly resisted Oyo control. Dahomey's successful rebellion in the 1820s was particularly damaging, cutting off Oyo's access to the Atlantic trade.</p>

            <h3>Islamic Jihads:</h3>
            <p>The Fulani jihad of Usman dan Fodio in the early 19th century threatened Oyo's northern territories. The empire's military, designed for cavalry warfare, struggled against the jihadists' religious fervor and guerrilla tactics.</p>

            <h3>Economic Disruption:</h3>
            <p>The abolition of the Atlantic slave trade by European powers disrupted established economic patterns. Additionally, new trade routes bypassed traditional Oyo-controlled paths.</p>

            <h2>The Final Collapse</h2>
            <p>In 1835, the Old Oyo capital was abandoned after years of civil war and external pressure. The population scattered, with many fleeing south to establish new settlements. The Alaafin relocated to Ago Oja (modern Oyo town), a shadow of the former imperial capital.</p>

            <p>Though the empire had fallen, Oyo's legacy endured. The political innovations, cultural achievements, and historical memories continued to shape Yoruba identity. Even under British colonial rule, the Alaafin of Oyo retained symbolic importance, and today the title commands respect throughout Yorubaland.</p>

            <h2>Lessons and Legacy</h2>
            <p>The Oyo Empire's history offers valuable lessons about:</p>
            <ul>
                <li><strong>Governance:</strong> The importance of balanced power and institutional checks</li>
                <li><strong>Military Strategy:</strong> How technological advantages (cavalry) can create regional dominance</li>
                <li><strong>Economic Development:</strong> The role of trade networks in building wealth</li>
                <li><strong>Cultural Influence:</strong> How imperial powers can shape lasting cultural legacies</li>
                <li><strong>Political Stability:</strong> How succession disputes can undermine even powerful states</li>
            </ul>

            <h2>Conclusion</h2>
            <p>The Oyo Empire stands as a testament to the sophistication of pre-colonial African civilizations. For over four centuries, it demonstrated that African societies developed complex political systems, powerful military organizations, prosperous economies, and rich cultural traditions entirely independent of European influence.</p>

            <p>Understanding Oyo's rise and fall enriches our appreciation of Yoruba history and challenges simplistic narratives about Africa's past. The empire's legacy lives on in Yoruba institutions, art, language, and collective memory, reminding us of a time when Yoruba power shaped the destiny of West Africa.</p>
        `
    },
    2: {
        title: "Ile-Ife: The Sacred City and Cradle of Yoruba Civilization",
        category: "History",
        date: "October 18, 2025",
        readTime: "10 min",
        image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200",
        content: `
            <h2>The Spiritual Homeland</h2>
            <p>Ile-Ife, meaning "the place of expansion," holds a sacred place in Yoruba cosmology as the spot where creation began. According to Yoruba mythology, this is where Oduduwa descended from heaven on a chain, carrying a cockerel, a palm nut, and sand to create the earth...</p>
            
            <h2>Archaeological Wonders</h2>
            <p>Modern archaeology has revealed Ile-Ife's impressive past. The famous Ife bronze and terracotta sculptures, dating from the 12th to 15th centuries, showcase artistic techniques that rival any civilization of that era...</p>
            
            <p><strong>This is a preview. Full content will be loaded from your CMS.</strong></p>
        `
    }
    // Add more articles as needed
};

// Get article ID from URL
const urlParams = new URLSearchParams(window.location.search);
const articleId = parseInt(urlParams.get('id'));

// Load article
async function loadArticle() {
    let article = null;
    
    // Try to load from CMS first
    if (typeof getArticleById === 'function') {
        try {
            const allArticles = await getArticles(Object.values(fallbackFullArticlesData));
            
            // Try to find article by numeric ID
            article = allArticles.find(a => a.id === articleId);
            
            // If not found, also try the fallback data
            if (!article) {
                article = fallbackFullArticlesData[articleId];
            }
            
            console.log(`✓ Article loaded: ${article ? article.title : 'not found with ID ' + articleId}`);
        } catch (error) {
            console.warn('Error loading article from CMS:', error);
            article = fallbackFullArticlesData[articleId];
        }
    } else {
        // Fall back to hardcoded data
        article = fallbackFullArticlesData[articleId];
    }
    
    if (!article) {
        // If article not found, show error
        document.getElementById('articleTitle').textContent = 'Article Not Found';
        document.getElementById('articleContent').innerHTML = `
            <p>Sorry, this article could not be found.</p>
            <a href="articles.html" class="btn btn-primary">Back to Articles</a>
        `;
        return;
    }
    
    // Set article data
    document.getElementById('articleTitle').textContent = article.title;
    document.getElementById('articleCategory').textContent = article.category;
    document.getElementById('articleDate').textContent = article.date;
    document.getElementById('articleReadTime').textContent = article.readTime;
    document.getElementById('articleContent').innerHTML = article.content;
    
    // Set featured image
    const imageContainer = document.getElementById('articleImage');
    if (article.image) {
        imageContainer.innerHTML = `<img src="${article.image}" alt="${article.title}">`;
    }
    
    // Update page title
    document.title = `${article.title} - Yoruba Heritage`;
    
    // Load related articles
    loadRelatedArticles(article.category);
}

// Load related articles
async function loadRelatedArticles(category) {
    const relatedContainer = document.getElementById('relatedArticles');
    
    let allArticles = [];
    
    // Try to load from CMS
    if (typeof getArticles === 'function') {
        try {
            allArticles = await getArticles(Object.values(fallbackFullArticlesData));
        } catch (error) {
            console.warn('Error loading related articles:', error);
            allArticles = Object.values(fallbackFullArticlesData);
        }
    } else {
        allArticles = Object.values(fallbackFullArticlesData);
    }
    
    const related = allArticles
        .filter(article => {
            const articleCategory = typeof article.category === 'string' 
                ? article.category.toLowerCase() 
                : article.category;
            const targetCategory = typeof category === 'string' 
                ? category.toLowerCase() 
                : category;
            return articleCategory === targetCategory && article.id !== articleId;
        })
        .slice(0, 3);
    
    if (related.length === 0) {
        relatedContainer.innerHTML = '<p>No related articles found.</p>';
        return;
    }
    
    relatedContainer.innerHTML = '';
    related.forEach(article => {
        const card = document.createElement('div');
        card.className = 'related-card';
        card.onclick = () => window.location.href = `article-detail.html?id=${article.id}`;
        
        card.innerHTML = `
            <div class="related-card-image">
                ${article.image ? `<img src="${article.image}" alt="${article.title}">` : ''}
            </div>
            <div class="related-card-content">
                <h3>${article.title}</h3>
                <p>${article.category} • ${article.readTime} read</p>
            </div>
        `;
        
        relatedContainer.appendChild(card);
    });
}

// Share functions
function shareArticle(platform) {
    const url = window.location.href;
    const title = document.getElementById('articleTitle').textContent;
    
    let shareUrl;
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
    });
}

// Initialize
loadArticle();
