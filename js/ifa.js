// IFA Wisdom Page JavaScript

const fallbackIfaContent = [
    {
        id: 1,
        title: "Understanding IFA: The Oracle of Wisdom",
        category: "IFA Basics",
        date: "October 21, 2025",
        readTime: "12 min",
        excerpt: "IFA is the Yoruba system of divination based on an extensive body of texts and mathematical systems. Learn the fundamentals of this ancient wisdom tradition that has guided millions for centuries.",
        image: null
    },
    {
        id: 2,
        title: "The 256 Odu: Sacred Verses of IFA",
        category: "Odu IFA",
        date: "October 19, 2025",
        readTime: "15 min",
        excerpt: "The Odu IFA are 256 chapters of sacred verses that form the foundation of IFA divination. Each Odu contains hundreds of verses addressing every aspect of life, from health to relationships to spirituality.",
        image: null
    },
    {
        id: 3,
        title: "Orunmila: Witness to Creation",
        category: "Orisha",
        date: "October 17, 2025",
        readTime: "10 min",
        excerpt: "Orunmila is the Orisha of wisdom and divination, the only Orisha present when Olodumare (God) created destiny. Learn about his role in Yoruba spirituality and why he is called Eleri Ipin (Witness to Destiny).",
        image: null
    },
    {
        id: 4,
        title: "The Babalawo: Priest of IFA",
        category: "Practice",
        date: "October 15, 2025",
        readTime: "9 min",
        excerpt: "Babalawos are the trained priests of IFA who dedicate their lives to mastering the divination system. Discover their training, responsibilities, and role in Yoruba communities worldwide.",
        image: null
    },
    {
        id: 5,
        title: "Ikin and Opele: Tools of Divination",
        category: "Practice",
        date: "October 13, 2025",
        readTime: "8 min",
        excerpt: "The sacred palm nuts (Ikin) and divination chain (Opele) are the primary tools used in IFA consultation. Learn about their significance and how they are used to reveal the Odu.",
        image: null
    },
    {
        id: 6,
        title: "Esu Elegbara: Divine Messenger",
        category: "Orisha",
        date: "October 11, 2025",
        readTime: "10 min",
        excerpt: "Esu is the Orisha who carries messages between humans and the divine realm. Often misunderstood, Esu is actually a crucial figure in IFA practice and Yoruba spirituality.",
        image: null
    },
    {
        id: 7,
        title: "The Process of IFA Divination",
        category: "Practice",
        date: "October 9, 2025",
        readTime: "11 min",
        excerpt: "A step-by-step explanation of how IFA divination works, from preparation to consultation to interpretation. Understand the sacred protocols and mathematical precision of this ancient system.",
        image: null
    },
    {
        id: 8,
        title: "IFA and Modern Life: Relevance Today",
        category: "Contemporary",
        date: "October 7, 2025",
        readTime: "7 min",
        excerpt: "Despite its ancient origins, IFA remains highly relevant in contemporary life. Explore how people worldwide consult IFA for guidance on modern challenges, from career decisions to health issues.",
        image: null
    },
    {
        id: 9,
        title: "Ebo: Sacrifice and Offerings in IFA",
        category: "Practice",
        date: "October 5, 2025",
        readTime: "9 min",
        excerpt: "Ebo (sacrifice or offering) is a central concept in IFA practice. Learn about the different types of Ebo, their purposes, and how they help align individuals with their destiny.",
        image: null
    },
    {
        id: 10,
        title: "Women in IFA: The Iyanifa Tradition",
        category: "Contemporary",
        date: "October 3, 2025",
        readTime: "10 min",
        excerpt: "While IFA is often associated with men, there is a growing movement to recognize and restore the role of women (Iyanifa) as IFA practitioners, a tradition with deep historical roots.",
        image: null
    },
    {
        id: 11,
        title: "IFA Ethics: Living by the Code of Iwa-Pele",
        category: "Philosophy",
        date: "October 1, 2025",
        readTime: "8 min",
        excerpt: "Iwa-Pele (good character) is the cornerstone of IFA ethics. Discover the moral and ethical principles that guide IFA practitioners and devotees in their daily lives.",
        image: null
    },
    {
        id: 12,
        title: "The Sixteen Major Odu",
        category: "Odu IFA",
        date: "September 29, 2025",
        readTime: "14 min",
        excerpt: "The sixteen major Odu (Oju Odu) form the foundation from which all 256 Odu are derived. Learn about each of these principal Odu and their core messages.",
        image: null
    }
];

const ifaGrid = document.getElementById('ifaGrid');

function displayIfaContent() {
    ifaContent.forEach(item => {
        const card = document.createElement('div');
        card.className = 'article-card';
        
        card.innerHTML = `
            <div class="article-image">
                ${item.image ? 
                    `<img src="${item.image}" alt="${item.title}">` : 
                    '<div style="width:100%;height:100%;background:linear-gradient(135deg, #2C5F2D, #C17817);"></div>'
                }
                <span class="article-category">${item.category}</span>
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span><i class="far fa-calendar"></i> ${item.date}</span>
                    <span><i class="far fa-clock"></i> ${item.readTime} read</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.excerpt}</p>
                <a href="ifa-detail.html?id=${item.id}" class="article-link">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        
        ifaGrid.appendChild(card);
    });
    
    animateCards();
}

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

let ifaContent = fallbackIfaContent;

// Load content from CMS
async function initializeIfa() {
    try {
        if (typeof getIfa === 'function') {
            ifaContent = await getIfa(fallbackIfaContent);
            console.log(`✓ Loaded ${ifaContent.length} IFA articles from CMS`);
        }
    } catch (error) {
        console.warn('Using fallback IFA content:', error);
        ifaContent = fallbackIfaContent;
    }
    
    displayIfaContent();
}

initializeIfa();
