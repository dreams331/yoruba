// Yoruba Heritage - Main JavaScript

// ========================================
// Navigation Toggle (Mobile)
// ========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ========================================
// Smooth Scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Stats Counter Animation
// ========================================
const statsSection = document.querySelector('.stats');
let statsAnimated = false;

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for stats animation
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                animateStats();
                statsAnimated = true;
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// ========================================
// Scroll Indicator
// ========================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Navbar Scroll Effect
// ========================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Featured Content - Dynamic Loading
// ========================================
const featuredArticles = [
    {
        title: "The Oyo Empire: Rise of a West African Power",
        category: "History",
        date: "October 20, 2025",
        excerpt: "Explore the magnificent history of the Oyo Empire, one of the most powerful Yoruba kingdoms that dominated West Africa from the 14th to 19th century.",
        image: null,
        link: "articles.html#oyo-empire"
    },
    {
        title: "Understanding IFA: The Ancient Oracle System",
        category: "IFA Wisdom",
        date: "October 18, 2025",
        excerpt: "Delve into the profound wisdom of IFA divination, a complex system of spiritual guidance that has served the Yoruba people for millennia.",
        image: null,
        link: "ifa-wisdom.html#oracle-system"
    },
    {
        title: "Yoruba Language: A Linguistic Treasure",
        category: "Culture",
        date: "October 15, 2025",
        excerpt: "Discover the beauty and complexity of the Yoruba language, its tonal nature, and its influence on languages across the African diaspora.",
        image: null,
        link: "articles.html#yoruba-language"
    },
    {
        title: "Festivals and Celebrations: Preserving Tradition",
        category: "Culture",
        date: "October 12, 2025",
        excerpt: "From Egungun to Osun-Osogbo, explore the vibrant festivals that keep Yoruba traditions alive and thriving in the modern world.",
        image: null,
        link: "articles.html#festivals"
    },
    {
        title: "The Yoruba Diaspora: From Africa to the Americas",
        category: "Diaspora",
        date: "October 10, 2025",
        excerpt: "Trace the journey of Yoruba people across the Atlantic and their lasting cultural impact in Brazil, Cuba, Trinidad, and beyond.",
        image: null,
        link: "articles.html#diaspora"
    },
    {
        title: "Ife: The Sacred City and Cradle of Civilization",
        category: "History",
        date: "October 8, 2025",
        excerpt: "Uncover the mysteries of Ile-Ife, the spiritual homeland of the Yoruba people and the legendary birthplace of humanity according to Yoruba mythology.",
        image: null,
        link: "articles.html#ile-ife"
    }
];

function loadFeaturedContent() {
    const featuredContainer = document.getElementById('featuredContent');
    if (!featuredContainer) return;
    
    featuredArticles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'featured-card';
        
        card.innerHTML = `
            <div class="featured-image">
                ${article.image ? 
                    `<img src="${article.image}" alt="${article.title}">` : 
                    '<div style="width:100%;height:100%;background:linear-gradient(135deg, var(--primary-color), var(--secondary-color));"></div>'
                }
                <span class="featured-badge">${article.category}</span>
            </div>
            <div class="featured-content">
                <div class="featured-meta">
                    <span><i class="far fa-calendar"></i> ${article.date}</span>
                    <span><i class="far fa-clock"></i> 5 min read</span>
                </div>
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <a href="${article.link}" class="featured-link">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        
        featuredContainer.appendChild(card);
    });
}

// Load featured content on page load
if (document.getElementById('featuredContent')) {
    loadFeaturedContent();
}

// ========================================
// Newsletter Form Handler
// ========================================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to your backend/email service
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        e.target.reset();
    });
}

// ========================================
// Fade-in Animation on Scroll
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to cards
document.querySelectorAll('.category-card, .featured-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// ========================================
// Back to Top Button
// ========================================
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), #D4941D);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(193, 120, 23, 0.3);
        font-size: 1.2rem;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(button);
}

createBackToTopButton();

// ========================================
// Loading Animation
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
