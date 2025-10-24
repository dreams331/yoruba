// Diaspora Page JavaScript

const diasporaData = {
    americas: [
        {
            name: "Brazil",
            flag: "🇧🇷",
            flagCode: "br",
            population: "15-20 million",
            description: "Brazil has the largest Yoruba diaspora population outside Africa. Candomblé and Umbanda religions preserve Yoruba spiritual practices, particularly strong in Bahia and Rio de Janeiro.",
            tags: ["Candomblé", "Umbanda", "Strong Community"]
        },
        {
            name: "United States",
            flag: "🇺🇸",
            flagCode: "us",
            population: "1-2 million",
            description: "Growing Yoruba communities across major cities, with cultural centers, language schools, and Orisha worship communities, particularly in New York, Miami, and Houston.",
            tags: ["Cultural Centers", "Growing Community"]
        },
        {
            name: "Venezuela",
            flag: "🇻🇪",
            flagCode: "ve",
            population: "500,000+",
            description: "Yoruba-derived religions and cultural practices are present, often blended with local traditions and Catholicism.",
            tags: ["Religious Syncretism"]
        },
        {
            name: "Colombia",
            flag: "🇨🇴",
            flagCode: "co",
            population: "200,000+",
            description: "Significant Yoruba cultural influence, particularly in coastal regions with African heritage communities.",
            tags: ["Coastal Communities"]
        }
    ],
    caribbean: [
        {
            name: "Cuba",
            flag: "🇨🇺",
            flagCode: "cu",
            population: "3-5 million",
            description: "Santería (Regla de Ocha) is widely practiced, blending Yoruba Orisha worship with Catholic traditions. Yoruba influence permeates Cuban music, art, and daily life.",
            tags: ["Santería", "Strong Heritage"]
        },
        {
            name: "Trinidad and Tobago",
            flag: "🇹🇹",
            flagCode: "tt",
            population: "100,000+",
            description: "The Orisha religion (Shango Baptist) is an official religion, preserving Yoruba spiritual practices with minimal syncretism.",
            tags: ["Orisha Religion", "Cultural Pride"]
        },
        {
            name: "Haiti",
            flag: "🇭🇹",
            flagCode: "ht",
            population: "500,000+",
            description: "Yoruba deities (Lwa) are integrated into Vodou practices alongside Fon and Kongo traditions.",
            tags: ["Vodou", "Syncretism"]
        },
        {
            name: "Jamaica",
            flag: "🇯🇲",
            flagCode: "jm",
            population: "100,000+",
            description: "Yoruba influence in Rastafarian philosophy, Kumina religion, and Revival Zion practices.",
            tags: ["Kumina", "Revival Zion"]
        },
        {
            name: "Dominican Republic",
            flag: "🇩🇴",
            flagCode: "do",
            population: "50,000+",
            description: "Growing Yoruba religious practices and cultural awareness, particularly in urban areas.",
            tags: ["Emerging Community"]
        },
        {
            name: "Puerto Rico",
            flag: "🇵🇷",
            flagCode: "pr",
            population: "100,000+",
            description: "Santería and Yoruba cultural practices are present, often integrated with local spiritual traditions.",
            tags: ["Santería", "Cultural Blend"]
        }
    ],
    africa: [
        {
            name: "Nigeria",
            flag: "🇳🇬",
            flagCode: "ng",
            population: "40+ million",
            description: "The ancestral homeland of the Yoruba people, primarily in southwestern Nigeria including Lagos, Oyo, Ogun, Osun, Ondo, and Ekiti states.",
            tags: ["Homeland", "Origin"]
        },
        {
            name: "Benin",
            flag: "🇧🇯",
            flagCode: "bj",
            population: "1-2 million",
            description: "Significant Yoruba populations in western Benin, maintaining strong cultural and linguistic ties with Nigeria.",
            tags: ["Border Community"]
        },
        {
            name: "Togo",
            flag: "🇹🇬",
            flagCode: "tg",
            population: "500,000+",
            description: "Yoruba communities along the Nigerian border, preserving traditional culture and religion.",
            tags: ["Traditional Culture"]
        },
        {
            name: "Ghana",
            flag: "🇬🇭",
            flagCode: "gh",
            population: "100,000+",
            description: "Growing Yoruba immigrant communities, particularly in Accra, with cultural associations and religious centers.",
            tags: ["Immigrant Community"]
        },
        {
            name: "Sierra Leone",
            flag: "🇸🇱",
            flagCode: "sl",
            population: "50,000+",
            description: "Historical Yoruba community dating back to freed slaves (Creoles) who maintained Yoruba traditions and language.",
            tags: ["Historical Community", "Creole Heritage"]
        }
    ],
    europe: [
        {
            name: "United Kingdom",
            flag: "🇬🇧",
            flagCode: "gb",
            population: "500,000+",
            description: "Large Nigerian-British community with Yoruba cultural centers, churches, and organizations, particularly in London, Birmingham, and Manchester.",
            tags: ["Large Community", "Cultural Centers"]
        },
        {
            name: "Germany",
            flag: "🇩🇪",
            flagCode: "de",
            population: "100,000+",
            description: "Growing Yoruba community with cultural associations, religious centers, and language schools in major cities.",
            tags: ["Growing Community"]
        },
        {
            name: "France",
            flag: "🇫🇷",
            flagCode: "fr",
            population: "50,000+",
            description: "Yoruba immigrants maintaining cultural identity through community organizations and religious practices.",
            tags: ["Cultural Organizations"]
        },
        {
            name: "Italy",
            flag: "🇮🇹",
            flagCode: "it",
            population: "50,000+",
            description: "Emerging Yoruba community with cultural and religious centers, particularly in Rome and Milan.",
            tags: ["Emerging Community"]
        },
        {
            name: "Spain",
            flag: "🇪🇸",
            flagCode: "es",
            population: "30,000+",
            description: "Growing Nigerian community with Yoruba cultural presence in Barcelona, Madrid, and other major cities.",
            tags: ["Urban Communities"]
        }
    ]
};

// Populate regions
function populateCountries(region, containerId) {
    const container = document.getElementById(containerId);
    const countries = diasporaData[region];
    
    countries.forEach(country => {
        const card = document.createElement('div');
        card.className = 'country-card';
        
        card.innerHTML = `
            <div class="country-header">
                <div class="country-flag">${country.flag}</div>
                <div class="country-info">
                    <h3>${country.name}</h3>
                    <p class="population">${country.population}</p>
                </div>
            </div>
            <p class="country-description">${country.description}</p>
            <div class="country-tags">
                ${country.tags.map(tag => `<span class="country-tag">${tag}</span>`).join('')}
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Animate statistics
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Animate cards on scroll
function animateOnScroll() {
    const cards = document.querySelectorAll('.country-card, .expression-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => observer.observe(card));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Populate all regions
    populateCountries('americas', 'americasGrid');
    populateCountries('caribbean', 'caribbeanGrid');
    populateCountries('africa', 'africaGrid');
    populateCountries('europe', 'europeGrid');
    
    // Animate stats when they come into view
    const statsSection = document.querySelector('.stats-section');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Animate cards
    setTimeout(animateOnScroll, 300);
});
