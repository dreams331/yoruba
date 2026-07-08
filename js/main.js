// Yoruba Heritage - Main JavaScript

// ========================================
// Dark Mode
// ========================================
(function initDarkMode() {
    const saved = localStorage.getItem('yh-theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);

    // Inject toggle button into navbar once DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        const navMenu = document.getElementById('navMenu');
        if (!navMenu || document.getElementById('darkToggle')) return;

        const btn = document.createElement('button');
        btn.id = 'darkToggle';
        btn.className = 'dark-toggle';
        btn.setAttribute('aria-label', 'Toggle dark mode');
        btn.setAttribute('title', 'Toggle dark mode');
        btn.innerHTML = saved === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

        // Insert as a list item inside the nav menu so it flows naturally
        const li = document.createElement('li');
        li.appendChild(btn);
        navMenu.appendChild(li);

        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('yh-theme', next);
            btn.innerHTML = next === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

            // Update Giscus theme if present
            const giscusFrame = document.querySelector('iframe.giscus-frame');
            if (giscusFrame) {
                giscusFrame.contentWindow.postMessage(
                    { giscus: { setConfig: { theme: next === 'dark' ? 'dark' : 'light' } } },
                    'https://giscus.app'
                );
            }
        });
    });
})();

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
        id: 1,
        title: "The Oyo Empire: Rise of a West African Power",
        category: "History",
        date: "October 20, 2025",
        excerpt: "Explore the magnificent history of the Oyo Empire, one of the most powerful Yoruba kingdoms that dominated West Africa from the 14th to 19th century.",
        image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
        link: "article-detail.html?id=1"
    },
    {
        id: 3,
        title: "Understanding IFA: The Ancient Oracle System",
        category: "IFA Wisdom",
        date: "October 18, 2025",
        excerpt: "Delve into the profound wisdom of IFA divination, a complex system of spiritual guidance that has served the Yoruba people for millennia.",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
        link: "article-detail.html?id=3"
    },
    {
        id: 5,
        title: "Yoruba Language: A Linguistic Treasure",
        category: "Culture",
        date: "October 15, 2025",
        excerpt: "Discover the beauty and complexity of the Yoruba language, its tonal nature, and its influence on languages across the African diaspora.",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
        link: "article-detail.html?id=5"
    },
    {
        id: 8,
        title: "Festivals and Celebrations: Preserving Tradition",
        category: "Culture",
        date: "October 12, 2025",
        excerpt: "From Egungun to Osun-Osogbo, explore the vibrant festivals that keep Yoruba traditions alive and thriving in the modern world.",
        image: "https://images.unsplash.com/photo-1516306580977-bd7e34a1f04e?w=800",
        link: "article-detail.html?id=8"
    },
    {
        id: 6,
        title: "The Yoruba Diaspora: From Africa to the Americas",
        category: "Diaspora",
        date: "October 10, 2025",
        excerpt: "Trace the journey of Yoruba people across the Atlantic and their lasting cultural impact in Brazil, Cuba, Trinidad, and beyond.",
        image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800",
        link: "article-detail.html?id=6"
    },
    {
        id: 2,
        title: "Ife: The Sacred City and Cradle of Civilization",
        category: "History",
        date: "October 8, 2025",
        excerpt: "Uncover the mysteries of Ile-Ife, the spiritual homeland of the Yoruba people and the legendary birthplace of humanity according to Yoruba mythology.",
        image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800",
        link: "article-detail.html?id=2"
    }
];

function loadFeaturedContent() {
    const featuredContainer = document.getElementById('featuredContent');
    if (!featuredContainer) return;
    
    featuredArticles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'featured-card';
        
        card.innerHTML = `
            <a href="${article.link}" class="featured-image-link">
                <div class="featured-image">
                    ${article.image ? 
                        `<img src="${article.image}" alt="${article.title}">` : 
                        '<div style="width:100%;height:100%;background:linear-gradient(135deg, var(--primary-color), var(--secondary-color));"></div>'
                    }
                    <span class="featured-badge">${article.category}</span>
                </div>
            </a>
            <div class="featured-content">
                <div class="featured-meta">
                    <span><i class="far fa-calendar"></i> ${article.date}</span>
                    <span><i class="far fa-clock"></i> 5 min read</span>
                </div>
                <h3><a href="${article.link}" style="color:inherit;text-decoration:none;">${article.title}</a></h3>
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
// Newsletter Form — Netlify AJAX submission
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', async e => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const btn = form.querySelector('button[type="submit"]');
            if (!emailInput || !emailInput.value) return;

            const original = btn.textContent;
            btn.textContent = 'Subscribing…';
            btn.disabled = true;

            try {
                const body = new URLSearchParams({ 'form-name': 'newsletter', email: emailInput.value });
                await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
                btn.textContent = '✓ Subscribed!';
                btn.style.background = '#2e7d32';
                emailInput.value = '';
                setTimeout(() => { btn.textContent = original; btn.style.background = ''; btn.disabled = false; }, 3000);
            } catch {
                btn.textContent = 'Try again';
                btn.disabled = false;
            }
        });
    });
});

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

// ========================================
// PWA — Service Worker & Install Prompt
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('✓ Yoruba Heritage PWA ready'))
            .catch(err => console.warn('SW:', err));
    });
}

// Show "Add to Home Screen" banner after a delay if not already installed
let _deferredPrompt = null;

// Expose a global install helper for the promo section button
window.__pwaInstall = function () {
    if (_deferredPrompt) {
        _deferredPrompt.prompt();
        _deferredPrompt.userChoice.then(choice => {
            _deferredPrompt = null;
            _updatePromoBtn(choice.outcome === 'accepted');
        });
    } else {
        // Fallback: guide the user
        alert('To install:\n• iPhone/iPad — tap Share ⬆️ then "Add to Home Screen"\n• Android/Desktop — tap the install icon in your browser address bar');
    }
};

function _updatePromoBtn(installed) {
    const btn = document.getElementById('appPromoInstallBtn');
    if (!btn) return;
    if (installed) {
        btn.innerHTML = '<i class="fas fa-check"></i> Installed!';
        btn.disabled = true;
        btn.style.opacity = '0.7';
    }
}

window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    _deferredPrompt = e;

    // Show a subtle install banner after 30 seconds
    setTimeout(() => {
        if (!_deferredPrompt) return;
        const banner = document.createElement('div');
        banner.id = 'pwa-install-banner';
        banner.innerHTML = `
            <span>👑 Add <strong>Yoruba Heritage</strong> to your home screen</span>
            <button id="pwa-install-btn">Install</button>
            <button id="pwa-dismiss-btn" aria-label="Dismiss">✕</button>
        `;
        document.body.appendChild(banner);

        document.getElementById('pwa-install-btn').addEventListener('click', () => {
            _deferredPrompt.prompt();
            _deferredPrompt.userChoice.then(choice => {
                _deferredPrompt = null;
                banner.remove();
                _updatePromoBtn(choice.outcome === 'accepted');
            });
        });
        document.getElementById('pwa-dismiss-btn').addEventListener('click', () => banner.remove());
    }, 30000);
});

window.addEventListener('appinstalled', () => {
    _deferredPrompt = null;
    _updatePromoBtn(true);
    const banner = document.getElementById('pwa-install-banner');
    if (banner) banner.remove();
});
