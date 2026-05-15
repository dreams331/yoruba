// Diaspora Country Page JavaScript

// All country data (mirrors diaspora.js)
const allCountriesData = {
    brazil: {
        name: "Brazil", flag: "🇧🇷", region: "The Americas",
        population: "15–20 million",
        description: "Brazil has the largest Yoruba diaspora population outside Africa. Candomblé and Umbanda religions preserve Yoruba spiritual practices, particularly strong in Bahia and Rio de Janeiro. The Yoruba (known locally as Nagô or Lucumi) shaped Brazilian music, food, religion, and language in profound ways.",
        tags: ["Candomblé", "Umbanda", "Nagô", "Strong Community"]
    },
    "united-states": {
        name: "United States", flag: "🇺🇸", region: "The Americas",
        population: "1–2 million",
        description: "Growing Yoruba communities across major cities, with cultural centers, language schools, and Orisha worship communities, particularly in New York, Miami, and Houston.",
        tags: ["Cultural Centers", "Growing Community"]
    },
    venezuela: {
        name: "Venezuela", flag: "🇻🇪", region: "The Americas",
        population: "500,000+",
        description: "Yoruba-derived religions and cultural practices are present, often blended with local traditions and Catholicism.",
        tags: ["Religious Syncretism"]
    },
    colombia: {
        name: "Colombia", flag: "🇨🇴", region: "The Americas",
        population: "200,000+",
        description: "Significant Yoruba cultural influence, particularly in coastal regions with African heritage communities.",
        tags: ["Coastal Communities"]
    },
    cuba: {
        name: "Cuba", flag: "🇨🇺", region: "Caribbean",
        population: "3–5 million",
        description: "Santería (Regla de Ocha) is widely practiced, blending Yoruba Orisha worship with Catholic traditions. Yoruba influence permeates Cuban music, art, and daily life.",
        tags: ["Santería", "Strong Heritage"]
    },
    "trinidad-and-tobago": {
        name: "Trinidad and Tobago", flag: "🇹🇹", region: "Caribbean",
        population: "100,000+",
        description: "The Orisha religion (Shango Baptist) is an official religion, preserving Yoruba spiritual practices with minimal syncretism.",
        tags: ["Orisha Religion", "Cultural Pride"]
    },
    haiti: {
        name: "Haiti", flag: "🇭🇹", region: "Caribbean",
        population: "500,000+",
        description: "Yoruba deities (Lwa) are integrated into Vodou practices alongside Fon and Kongo traditions.",
        tags: ["Vodou", "Syncretism"]
    },
    jamaica: {
        name: "Jamaica", flag: "🇯🇲", region: "Caribbean",
        population: "100,000+",
        description: "Yoruba influence in Rastafarian philosophy, Kumina religion, and Revival Zion practices.",
        tags: ["Kumina", "Revival Zion"]
    },
    "dominican-republic": {
        name: "Dominican Republic", flag: "🇩🇴", region: "Caribbean",
        population: "50,000+",
        description: "Growing Yoruba religious practices and cultural awareness, particularly in urban areas.",
        tags: ["Emerging Community"]
    },
    "puerto-rico": {
        name: "Puerto Rico", flag: "🇵🇷", region: "Caribbean",
        population: "100,000+",
        description: "Santería and Yoruba cultural practices are present, often integrated with local spiritual traditions.",
        tags: ["Santería", "Cultural Blend"]
    },
    nigeria: {
        name: "Nigeria", flag: "🇳🇬", region: "Africa",
        population: "40+ million",
        description: "The ancestral homeland of the Yoruba people, primarily in southwestern Nigeria including Lagos, Oyo, Ogun, Osun, Ondo, and Ekiti states.",
        tags: ["Homeland", "Origin"]
    },
    benin: {
        name: "Benin", flag: "🇧🇯", region: "Africa",
        population: "1–2 million",
        description: "Significant Yoruba populations in western Benin, maintaining strong cultural and linguistic ties with Nigeria.",
        tags: ["Border Community"]
    },
    togo: {
        name: "Togo", flag: "🇹🇬", region: "Africa",
        population: "500,000+",
        description: "Yoruba communities along the Nigerian border, preserving traditional culture and religion.",
        tags: ["Traditional Culture"]
    },
    ghana: {
        name: "Ghana", flag: "🇬🇭", region: "Africa",
        population: "100,000+",
        description: "Growing Yoruba immigrant communities, particularly in Accra, with cultural associations and religious centers.",
        tags: ["Immigrant Community"]
    },
    "sierra-leone": {
        name: "Sierra Leone", flag: "🇸🇱", region: "Africa",
        population: "50,000+",
        description: "Historical Yoruba community dating back to freed slaves (Creoles) who maintained Yoruba traditions and language.",
        tags: ["Historical Community", "Creole Heritage"]
    },
    "united-kingdom": {
        name: "United Kingdom", flag: "🇬🇧", region: "Europe",
        population: "500,000+",
        description: "Large Nigerian-British community with Yoruba cultural centers, churches, and organisations, particularly in London, Birmingham, and Manchester.",
        tags: ["Large Community", "Cultural Centers"]
    },
    germany: {
        name: "Germany", flag: "🇩🇪", region: "Europe",
        population: "100,000+",
        description: "Growing Yoruba community with cultural associations, religious centers, and language schools in major cities.",
        tags: ["Growing Community"]
    },
    france: {
        name: "France", flag: "🇫🇷", region: "Europe",
        population: "50,000+",
        description: "Yoruba immigrants maintaining cultural identity through community organisations and religious practices.",
        tags: ["Cultural Organizations"]
    },
    italy: {
        name: "Italy", flag: "🇮🇹", region: "Europe",
        population: "50,000+",
        description: "Emerging Yoruba community with cultural and religious centers, particularly in Rome and Milan.",
        tags: ["Emerging Community"]
    },
    spain: {
        name: "Spain", flag: "🇪🇸", region: "Europe",
        population: "30,000+",
        description: "Growing Nigerian community with Yoruba cultural presence in Barcelona, Madrid, and other major cities.",
        tags: ["Urban Communities"]
    }
};

// Get country slug from URL
const urlParams = new URLSearchParams(window.location.search);
const countrySlug = urlParams.get('country');

async function loadCountryPage() {
    const country = allCountriesData[countrySlug];

    if (!country) {
        document.getElementById('countryName').textContent = 'Country Not Found';
        document.getElementById('countryDescription').textContent = 'This country page could not be found.';
        return;
    }

    // Update page title and meta
    document.title = `Yoruba in ${country.name} - Yoruba Heritage`;

    // Hero section
    document.getElementById('countryFlag').textContent = country.flag;
    document.getElementById('countryName').textContent = `Yoruba in ${country.name}`;
    document.getElementById('countryRegion').textContent = country.region;
    document.getElementById('countryPopulation').textContent = country.population;

    // Overview
    document.getElementById('countryDescription').textContent = country.description;
    document.getElementById('cmsCountryName').textContent = country.name;

    // Tags
    const tagsContainer = document.getElementById('countryTags');
    country.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'country-tag-large';
        span.textContent = tag;
        tagsContainer.appendChild(span);
    });

    // Sidebar
    document.getElementById('sidebarRegion').textContent = country.region;
    document.getElementById('sidebarPop').textContent = country.population;
    document.getElementById('sidebarTags').textContent = country.tags.join(', ');

    // Load CMS content for this country if available
    try {
        const response = await fetch(`data/diaspora-countries.json`);
        if (response.ok) {
            const countriesContent = await response.json();
            const cms = countriesContent.find(c => c.slug === countrySlug);
            if (cms && cms.content) {
                document.getElementById('countryArticleContent').innerHTML = cms.content;
            }
        }
    } catch (e) {
        // No CMS content yet, placeholder stays
    }
}

loadCountryPage();
