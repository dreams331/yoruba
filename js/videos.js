/**
 * Videos page — search, filter, grid, modal (embedded playback)
 */
let allVideos = [];
let filteredVideos = [];
let currentVideoFilter = 'all';

async function loadVideos() {
    try {
        const res = await fetch('/data/videos.json');
        allVideos = res.ok ? await res.json() : [];
    } catch (e) {
        console.error('Videos load error:', e);
        allVideos = [];
    }
    allVideos.sort((a, b) => new Date(b.date) - new Date(a.date));
    filteredVideos = allVideos.slice();
    renderVideos();
    setupVideoControls();
    setupVideoModal();
}

function applyVideoFilters() {
    const q = (document.getElementById('videoSearch')?.value || '').trim().toLowerCase();
    filteredVideos = allVideos.filter(v => {
        const matchesCat = currentVideoFilter === 'all' || v.category === currentVideoFilter;
        if (!matchesCat) return false;
        if (!q) return true;
        const haystack = [v.title, v.description, v.credit].join(' ').toLowerCase();
        return haystack.includes(q);
    });
    renderVideos();
}

function setupVideoControls() {
    const input = document.getElementById('videoSearch');
    if (input) {
        let debounce;
        input.addEventListener('input', () => {
            clearTimeout(debounce);
            debounce = setTimeout(applyVideoFilters, 200);
        });
    }
    const bar = document.getElementById('videoFilters');
    if (bar) {
        bar.addEventListener('click', e => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;
            bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentVideoFilter = btn.dataset.filter;
            applyVideoFilters();
        });
    }
}

function renderVideos() {
    const grid = document.getElementById('videosGrid');
    const empty = document.getElementById('videosEmpty');
    const countEl = document.getElementById('videoResultsCount');
    if (!grid) return;

    if (countEl) countEl.textContent = `Showing ${filteredVideos.length} of ${allVideos.length} videos`;

    if (filteredVideos.length === 0) {
        grid.innerHTML = '';
        if (empty) empty.style.display = 'block';
        return;
    }
    if (empty) empty.style.display = 'none';

    grid.innerHTML = filteredVideos.map(v => {
        const thumb = v.image || (typeof getYouTubeThumbnail === 'function' ? getYouTubeThumbnail(v.video_url) : null);
        return `
        <article class="video-card" data-id="${v.filename}">
            ${thumb ? `<img class="event-card-img" src="${thumb}" alt="${escapeAttrV(v.title)}" loading="lazy">` : ''}
            <div class="video-card-body">
                <span class="video-card-category">${v.category || ''}</span>
                <h3>${v.title}</h3>
                <p>${v.description || ''}</p>
                ${v.credit ? `<p class="video-card-credit">Credit: ${v.credit}</p>` : ''}
            </div>
        </article>
    `;
    }).join('');

    grid.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => openVideoModal(card.dataset.id));
    });
}

function setupVideoModal() {
    const modal = document.getElementById('videoModal');
    const backdrop = document.getElementById('videoModalBackdrop');
    const closeBtn = document.getElementById('videoModalClose');
    const close = () => { modal.classList.remove('open'); document.getElementById('videoModalBody').innerHTML = ''; };
    backdrop?.addEventListener('click', close);
    closeBtn?.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

function openVideoModal(filename) {
    const v = allVideos.find(x => x.filename === filename);
    if (!v) return;
    const modal = document.getElementById('videoModal');
    const body = document.getElementById('videoModalBody');

    const embed = typeof buildVideoEmbed === 'function' ? buildVideoEmbed(v.video_url, { title: v.title }) : null;

    body.innerHTML = `
        <h2>${v.title}</h2>
        <p class="odu-modal-meta">${v.category || ''}</p>
        ${embed || '<p>Video unavailable.</p>'}
        <p>${v.description || ''}</p>
        ${v.credit ? `<p class="video-card-credit">Credit: ${v.credit}</p>` : ''}
    `;
    modal.classList.add('open');
}

function escapeAttrV(str) {
    return (str || '').replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', loadVideos);
