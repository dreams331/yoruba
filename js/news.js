/**
 * News / Ìròyìn page — search, filter, list, modal
 */
let allNews = [];
let filteredNews = [];
let currentNewsFilter = 'all';

async function loadNews() {
    try {
        const res = await fetch('/data/news.json');
        allNews = res.ok ? await res.json() : [];
    } catch (e) {
        console.error('News load error:', e);
        allNews = [];
    }
    allNews.sort((a, b) => new Date(b.date) - new Date(a.date));
    filteredNews = allNews.slice();
    renderNews();
    setupNewsControls();
    setupNewsModal();
}

function applyNewsFilters() {
    const q = (document.getElementById('newsSearch')?.value || '').trim().toLowerCase();
    filteredNews = allNews.filter(n => {
        const matchesCat = currentNewsFilter === 'all' || n.category === currentNewsFilter;
        if (!matchesCat) return false;
        if (!q) return true;
        const haystack = [n.title, n.excerpt, n.source_name].join(' ').toLowerCase();
        return haystack.includes(q);
    });
    renderNews();
}

function setupNewsControls() {
    const input = document.getElementById('newsSearch');
    if (input) {
        let debounce;
        input.addEventListener('input', () => {
            clearTimeout(debounce);
            debounce = setTimeout(applyNewsFilters, 200);
        });
    }
    const bar = document.getElementById('newsFilters');
    if (bar) {
        bar.addEventListener('click', e => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;
            bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentNewsFilter = btn.dataset.filter;
            applyNewsFilters();
        });
    }
}

function renderNews() {
    const list = document.getElementById('newsList');
    const empty = document.getElementById('newsEmpty');
    const countEl = document.getElementById('newsResultsCount');
    if (!list) return;

    if (countEl) countEl.textContent = `Showing ${filteredNews.length} of ${allNews.length} items`;

    if (filteredNews.length === 0) {
        list.innerHTML = '';
        if (empty) empty.style.display = 'block';
        return;
    }
    if (empty) empty.style.display = 'none';

    list.innerHTML = filteredNews.map(n => `
        <article class="news-item" data-id="${n.filename}">
            ${n.image ? `<img class="news-item-img" src="${n.image}" alt="" loading="lazy">` : ''}
            <div class="news-item-body">
                <span class="news-item-category">${n.category || ''}</span>
                <h3>${n.title}</h3>
                <p>${n.excerpt || ''}</p>
                ${n.source_name ? `<p class="news-item-source">Source: ${n.source_name}</p>` : ''}
            </div>
        </article>
    `).join('');

    list.querySelectorAll('.news-item').forEach(item => {
        item.addEventListener('click', () => openNewsModal(item.dataset.id));
    });
}

function setupNewsModal() {
    const modal = document.getElementById('newsModal');
    const backdrop = document.getElementById('newsModalBackdrop');
    const closeBtn = document.getElementById('newsModalClose');
    const close = () => modal.classList.remove('open');
    backdrop?.addEventListener('click', close);
    closeBtn?.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

function openNewsModal(filename) {
    const n = allNews.find(x => x.filename === filename);
    if (!n) return;
    const modal = document.getElementById('newsModal');
    const body = document.getElementById('newsModalBody');

    let videoHtml = '';
    if (n.video_url && typeof buildVideoEmbed === 'function') {
        const embed = buildVideoEmbed(n.video_url, { title: n.title });
        if (embed) videoHtml = embed;
    }

    body.innerHTML = `
        <h2>${n.title}</h2>
        <p class="odu-modal-meta">${n.category || ''} &middot; ${n.date ? new Date(n.date).toLocaleDateString() : ''}</p>
        ${n.image ? `<img src="${n.image}" alt="" style="width:100%;border-radius:10px;margin-bottom:1rem;">` : ''}
        ${videoHtml}
        <div>${n.htmlContent || `<p>${n.excerpt || ''}</p>`}</div>
        ${n.source_link ? `<p style="margin-top:1rem;"><a class="btn btn-outline" href="${n.source_link}" target="_blank" rel="noopener">Read full story at ${n.source_name || 'source'} <i class="fas fa-external-link-alt"></i></a></p>` : ''}
    `;
    modal.classList.add('open');
}

document.addEventListener('DOMContentLoaded', loadNews);
