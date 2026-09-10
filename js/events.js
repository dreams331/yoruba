/**
 * Events / Festivals (Àjọ̀dún) page — search, filter, grid, modal
 */
let allEvents = [];
let filteredEvents = [];
let currentEventFilter = 'all';

async function loadEvents() {
    try {
        const res = await fetch('/data/events.json');
        allEvents = res.ok ? await res.json() : [];
    } catch (e) {
        console.error('Events load error:', e);
        allEvents = [];
    }
    allEvents.sort((a, b) => (b.featured === true) - (a.featured === true));
    filteredEvents = allEvents.slice();
    renderEvents();
    setupEventControls();
    setupEventModal();
}

function applyEventFilters() {
    const q = (document.getElementById('eventSearch')?.value || '').trim().toLowerCase();
    filteredEvents = allEvents.filter(e => {
        const matchesType = currentEventFilter === 'all' || e.type === currentEventFilter;
        if (!matchesType) return false;
        if (!q) return true;
        const haystack = [e.title, e.title_yo, e.location, e.region, e.excerpt, e.orisha].join(' ').toLowerCase();
        return haystack.includes(q);
    });
    renderEvents();
}

function setupEventControls() {
    const input = document.getElementById('eventSearch');
    if (input) {
        let debounce;
        input.addEventListener('input', () => {
            clearTimeout(debounce);
            debounce = setTimeout(applyEventFilters, 200);
        });
    }
    const bar = document.getElementById('eventFilters');
    if (bar) {
        bar.addEventListener('click', e => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;
            bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentEventFilter = btn.dataset.filter;
            applyEventFilters();
        });
    }
}

function renderEvents() {
    const grid = document.getElementById('eventsGrid');
    const empty = document.getElementById('eventsEmpty');
    const countEl = document.getElementById('eventResultsCount');
    if (!grid) return;

    if (countEl) countEl.textContent = `Showing ${filteredEvents.length} of ${allEvents.length} events`;

    if (filteredEvents.length === 0) {
        grid.innerHTML = '';
        if (empty) empty.style.display = 'block';
        return;
    }
    if (empty) empty.style.display = 'none';

    grid.innerHTML = filteredEvents.map(ev => `
        <article class="event-card" data-id="${ev.filename}">
            ${ev.image ? `<img class="event-card-img" src="${ev.image}" alt="${escapeAttr(ev.title)}" loading="lazy">` : ''}
            <div class="event-card-body">
                <span class="event-card-type">${ev.type || ''}</span>
                <h3>${ev.title}</h3>
                <div class="event-card-meta">
                    <i class="fas fa-map-marker-alt"></i> ${ev.location || ''} ${ev.timing ? `&middot; <i class="fas fa-calendar"></i> ${ev.timing}` : ''}
                </div>
                <p class="event-excerpt">${ev.excerpt || ''}</p>
            </div>
        </article>
    `).join('');

    grid.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => openEventModal(card.dataset.id));
    });
}

function setupEventModal() {
    const modal = document.getElementById('eventModal');
    const backdrop = document.getElementById('eventModalBackdrop');
    const closeBtn = document.getElementById('eventModalClose');
    const close = () => modal.classList.remove('open');
    backdrop?.addEventListener('click', close);
    closeBtn?.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

function openEventModal(filename) {
    const ev = allEvents.find(e => e.filename === filename);
    if (!ev) return;
    const modal = document.getElementById('eventModal');
    const body = document.getElementById('eventModalBody');

    let videoHtml = '';
    if (ev.video_url && typeof buildVideoEmbed === 'function') {
        const embed = buildVideoEmbed(ev.video_url, { title: ev.title });
        if (embed) videoHtml = embed;
    }

    body.innerHTML = `
        <h2>${ev.title}</h2>
        <p class="odu-modal-meta">${ev.type || ''} &middot; ${ev.location || ''} ${ev.timing ? `&middot; ${ev.timing}` : ''}</p>
        ${ev.image ? `<img src="${ev.image}" alt="${escapeAttr(ev.title)}" style="width:100%;border-radius:10px;margin-bottom:1rem;">` : ''}
        ${videoHtml}
        <div>${ev.htmlContent || `<p>${ev.excerpt || ''}</p>`}</div>
        ${ev.link ? `<p style="margin-top:1rem;"><a class="btn btn-outline" href="${ev.link}" target="_blank" rel="noopener">Learn more <i class="fas fa-external-link-alt"></i></a></p>` : ''}
    `;
    modal.classList.add('open');
}

function escapeAttr(str) {
    return (str || '').replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', loadEvents);
