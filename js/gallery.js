/**
 * Gallery Page — Dynamic loader with filtering and lightbox
 */

let allItems = [];
let currentFilter = 'all';

const CATEGORY_LABELS = {
    'all': 'All',
    'artifacts': 'Artifacts',
    'festivals': 'Festivals',
    'sacred': 'Sacred & Spiritual',
    'history': 'History',
    'arts-crafts': 'Arts & Crafts',
    'contemporary': 'Contemporary',
    'diaspora': 'Diaspora'
};

async function loadGallery() {
    try {
        const res = await fetch('/data/gallery.json');
        if (!res.ok) throw new Error('Could not load gallery data');
        allItems = await res.json();
    } catch (e) {
        console.error('Gallery load error:', e);
        allItems = [];
    }

    buildFilterBar();
    renderGrid(allItems);
    buildLightbox();
}

function buildFilterBar() {
    const bar = document.getElementById('galleryFilters');
    if (!bar) return;

    const categories = ['all', ...new Set(allItems.map(i => i.category))];

    bar.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat === 'all' ? 'active' : ''}" data-category="${cat}">
            ${CATEGORY_LABELS[cat] || cat}
        </button>
    `).join('');

    bar.addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.category;
        const filtered = currentFilter === 'all' ? allItems : allItems.filter(i => i.category === currentFilter);
        renderGrid(filtered);
    });
}

function renderGrid(items) {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    if (items.length === 0) {
        grid.innerHTML = `<div class="gallery-empty"><i class="fas fa-images"></i><p>No items in this category yet.</p></div>`;
        return;
    }

    grid.innerHTML = items.map((item, idx) => `
        <div class="gallery-item" data-index="${allItems.indexOf(item)}" role="button" tabindex="0" aria-label="View ${item.title}">
            <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600'">
            <div class="gallery-item-overlay">
                <div class="gallery-item-info">
                    <span class="gallery-item-category">${CATEGORY_LABELS[item.category] || item.category}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description.substring(0, 100)}…</p>
                </div>
                <i class="fas fa-expand gallery-expand-icon"></i>
            </div>
        </div>
    `).join('');

    grid.querySelectorAll('.gallery-item').forEach(el => {
        el.addEventListener('click', () => openLightbox(parseInt(el.dataset.index)));
        el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(parseInt(el.dataset.index)); });
    });
}

/* ── Lightbox ── */
let lightboxIndex = 0;

function buildLightbox() {
    if (document.getElementById('galleryLightbox')) return;
    const lb = document.createElement('div');
    lb.id = 'galleryLightbox';
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close"><i class="fas fa-times"></i></button>
            <button class="lightbox-prev" aria-label="Previous"><i class="fas fa-chevron-left"></i></button>
            <button class="lightbox-next" aria-label="Next"><i class="fas fa-chevron-right"></i></button>
            <div class="lightbox-media">
                <img id="lightboxImg" src="" alt="">
            </div>
            <div class="lightbox-details">
                <span id="lightboxCategory" class="lightbox-tag"></span>
                <h2 id="lightboxTitle"></h2>
                <p id="lightboxDesc"></p>
                <div id="lightboxTags" class="lightbox-tags"></div>
            </div>
            <div class="lightbox-counter"><span id="lightboxCounter"></span></div>
        </div>
    `;
    document.body.appendChild(lb);

    lb.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox-prev').addEventListener('click', () => shiftLightbox(-1));
    lb.querySelector('.lightbox-next').addEventListener('click', () => shiftLightbox(1));

    document.addEventListener('keydown', e => {
        if (!lb.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') shiftLightbox(-1);
        if (e.key === 'ArrowRight') shiftLightbox(1);
    });
}

function openLightbox(index) {
    lightboxIndex = index;
    populateLightbox();
    const lb = document.getElementById('galleryLightbox');
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('galleryLightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function shiftLightbox(dir) {
    lightboxIndex = (lightboxIndex + dir + allItems.length) % allItems.length;
    populateLightbox();
}

function populateLightbox() {
    const item = allItems[lightboxIndex];
    document.getElementById('lightboxImg').src = item.image;
    document.getElementById('lightboxImg').alt = item.title;
    document.getElementById('lightboxTitle').textContent = item.title;
    document.getElementById('lightboxDesc').textContent = item.description;
    document.getElementById('lightboxCategory').textContent = CATEGORY_LABELS[item.category] || item.category;
    document.getElementById('lightboxTags').innerHTML = (item.tags || []).map(t => `<span class="tag">#${t}</span>`).join('');
    document.getElementById('lightboxCounter').textContent = `${lightboxIndex + 1} / ${allItems.length}`;
}

document.addEventListener('DOMContentLoaded', loadGallery);
