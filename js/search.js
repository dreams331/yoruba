/**
 * Search Page — loads live data from JSON and searches across all content types
 */

let searchIndex = []; // Populated on load

const typeConfig = {
    article: { label: 'Article', icon: 'fa-newspaper',  urlFn: i => `article-detail.html?id=${i.id}` },
    story:   { label: 'Story',   icon: 'fa-scroll',     urlFn: i => `story-detail.html?id=${i.id}` },
    wisdom:  { label: 'IFA',     icon: 'fa-star-and-crescent', urlFn: i => `ifa-detail.html?id=${i.id}` },
};

async function buildSearchIndex() {
    const [articles, stories, ifa] = await Promise.all([
        fetch('/data/articles.json').then(r => r.json()).catch(() => []),
        fetch('/data/stories.json').then(r => r.json()).catch(() => []),
        fetch('/data/ifa.json').then(r => r.json()).catch(() => []),
    ]);

    const toDate = d => { try { return new Date(d).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }); } catch { return d || ''; } };

    searchIndex = [
        ...articles.map(a => ({ id: a.id, type: 'article', category: a.category || 'Article', title: a.title, excerpt: a.excerpt || '', date: toDate(a.date), readTime: a.readTime || '5 min', image: a.image || '' })),
        ...stories.map(s  => ({ id: s.id, type: 'story',   category: s.category  || 'Story',   title: s.title, excerpt: s.excerpt || '', date: toDate(s.date), readTime: s.readTime || '5 min', image: s.image || '' })),
        ...ifa.map(f      => ({ id: f.id, type: 'wisdom',  category: f.category  || 'IFA',     title: f.title, excerpt: f.excerpt || '', date: toDate(f.date), readTime: f.readTime || '10 min', image: f.image || '' })),
    ];
}

function performSearch(query) {
    if (!query.trim()) {
        document.getElementById('searchResults').style.display = 'none';
        return;
    }

    const term = query.toLowerCase();
    const filtered = searchIndex.filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.excerpt.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.type.toLowerCase().includes(term)
    );

    displayResults(filtered, query);
}

function displayResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    const resultsGrid   = document.getElementById('resultsGrid');
    const resultsCount  = document.getElementById('resultsCount');

    searchResults.style.display = 'block';
    searchResults.scrollIntoView({ behavior: 'smooth' });

    // Apply active filter type
    const activeTag = document.querySelector('.tag.active');
    const activeType = activeTag ? activeTag.dataset.type : null;
    const shown = activeType ? results.filter(r => r.type === activeType) : results;

    if (shown.length === 0) {
        resultsCount.textContent = `No results found for "${query}"`;
        resultsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No results found</h3>
                <p>Try different keywords or browse our categories</p>
            </div>`;
        return;
    }

    resultsCount.textContent = `Found ${shown.length} result${shown.length !== 1 ? 's' : ''} for "${query}"`;
    resultsGrid.innerHTML = shown.map(item => {
        const cfg = typeConfig[item.type] || typeConfig.article;
        const url = cfg.urlFn(item);
        const img = item.image ? `<img src="${item.image}" alt="${item.title}" onerror="this.style.display='none'">` : '';
        return `
        <div class="result-item">
            ${img}
            <div class="result-body">
                <span class="result-category"><i class="fas ${cfg.icon}"></i> ${cfg.label} · ${item.category}</span>
                <h3>${highlightText(item.title, query)}</h3>
                <p>${highlightText(item.excerpt.substring(0, 150), query)}${item.excerpt.length > 150 ? '…' : ''}</p>
                <div class="result-meta">
                    <span><i class="far fa-calendar"></i> ${item.date}</span>
                    <span><i class="far fa-clock"></i> ${item.readTime} read</span>
                </div>
                <a href="${url}" class="result-link">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>`;
    }).join('');

    animateResults();
}

function highlightText(text, query) {
    if (!query.trim() || !text) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function animateResults() {
    document.querySelectorAll('.result-item').forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, i * 60);
    });
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
    await buildSearchIndex();

    const mainSearch = document.getElementById('mainSearch');
    const searchBtn  = document.querySelector('.search-btn');

    searchBtn?.addEventListener('click', () => performSearch(mainSearch.value));
    mainSearch?.addEventListener('keypress', e => { if (e.key === 'Enter') performSearch(mainSearch.value); });

    // Filter tags — support both data-query (keyword) and data-type (content type)
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', () => {
            document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            const q = tag.dataset.query || mainSearch.value;
            if (q) { mainSearch.value = q; performSearch(q); }
        });
    });

    // URL param
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) { mainSearch.value = q; performSearch(q); }
});
