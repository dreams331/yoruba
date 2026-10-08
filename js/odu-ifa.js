/**
 * Odu Ifa Encyclopedia — search/filter grid, detail modal,
 * and interactive "Cast Your Odu" divination simulator.
 */

let allOdu = [];
let filteredOdu = [];
let currentCategoryFilter = 'all';
let visibleCount = 24;
const PAGE_SIZE = 24;

// Note: the 16 principal Odu Meji patterns are looked up directly from the
// loaded data (allOdu) at runtime — see findMejiSlugByPattern() below.

async function loadOduData() {
    try {
        const res = await fetch('/data/odu-ifa.json');
        if (!res.ok) throw new Error('Could not load Odu Ifa data');
        allOdu = await res.json();
    } catch (e) {
        console.error('Odu Ifa load error:', e);
        allOdu = [];
    }
    filteredOdu = allOdu.slice().sort((a, b) => Number(a.number) - Number(b.number));
    renderGrid();
    setupSearch();
    setupFilters();
    setupModal();
    setupCastWidget();
    setupPicker();
    handleDeepLink();
}

function applyFilters() {
    const q = (document.getElementById('oduSearch')?.value || '').trim().toLowerCase();
    filteredOdu = allOdu.filter(o => {
        const matchesCategory = currentCategoryFilter === 'all' || o.category === currentCategoryFilter;
        if (!matchesCategory) return false;
        if (!q) return true;
        const haystack = [o.title, o.number, o.theme, o.orisha, o.excerpt, o.slug].join(' ').toLowerCase();
        return haystack.includes(q);
    }).sort((a, b) => Number(a.number) - Number(b.number));
    visibleCount = PAGE_SIZE;
    renderGrid();
}

function setupSearch() {
    const input = document.getElementById('oduSearch');
    if (!input) return;
    let debounce;
    input.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(applyFilters, 200);
    });
}

function setupFilters() {
    const bar = document.getElementById('oduFilters');
    if (!bar) return;
    bar.addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategoryFilter = btn.dataset.filter;
        applyFilters();
    });
}

function renderGrid() {
    const grid = document.getElementById('oduGrid');
    const empty = document.getElementById('oduEmpty');
    const countEl = document.getElementById('oduResultsCount');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!grid) return;

    if (countEl) {
        countEl.textContent = `Showing ${Math.min(visibleCount, filteredOdu.length)} of ${filteredOdu.length} Odù`;
    }

    if (filteredOdu.length === 0) {
        grid.innerHTML = '';
        if (empty) empty.style.display = 'block';
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
    }
    if (empty) empty.style.display = 'none';

    const slice = filteredOdu.slice(0, visibleCount);
    grid.innerHTML = slice.map(cardHtml).join('');

    grid.querySelectorAll('.odu-card').forEach(card => {
        card.addEventListener('click', () => openModal(card.dataset.id));
    });

    if (loadMoreBtn) {
        loadMoreBtn.style.display = visibleCount < filteredOdu.length ? 'inline-block' : 'none';
        loadMoreBtn.onclick = () => {
            visibleCount += PAGE_SIZE;
            renderGrid();
        };
    }
}

function cardHtml(o) {
    return `
        <div class="odu-card" data-id="${o.id}">
            <span class="odu-card-number">Odù #${o.number}</span>
            <h3>${o.title}</h3>
            <span class="odu-card-badge">${o.category}</span>
            <p>${o.excerpt || ''}</p>
        </div>
    `;
}

function setupModal() {
    const modal = document.getElementById('oduModal');
    const backdrop = document.getElementById('oduModalBackdrop');
    const closeBtn = document.getElementById('oduModalClose');
    if (!modal) return;
    const close = () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        history.replaceState(null, '', window.location.pathname);
    };
    backdrop?.addEventListener('click', close);
    closeBtn?.addEventListener('click', close);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('open')) close();
    });
}

function openModal(id) {
    const o = allOdu.find(x => x.id === id || x.slug === id);
    if (!o) return;
    const modal = document.getElementById('oduModal');
    const body = document.getElementById('oduModalBody');
    body.innerHTML = `
        <h2>${o.title}</h2>
        <div class="odu-modal-meta">Odù #${o.number} &nbsp;·&nbsp; ${o.category} &nbsp;·&nbsp; Associated Òrìṣà: ${o.orisha || '—'}</div>
        ${o.proverb_yo ? `<blockquote><em>"${o.proverb_yo}"</em><br><em>"${o.proverb_en}"</em></blockquote>` : ''}
        ${o.htmlContent || `<p>${o.excerpt}</p>`}
    `;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    history.replaceState(null, '', `#${o.slug}`);
}

function handleDeepLink() {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const o = allOdu.find(x => x.slug === hash);
        if (o) openModal(o.id);
    }
}

/* ===================== Cast Your Odu ===================== */

function randomLeg() {
    return Array.from({ length: 4 }, () => (Math.random() < 0.5 ? 'I' : 'II'));
}

function findMejiSlugByPattern(patternArr) {
    const patternStr = patternArr.join(',');
    const entry = allOdu.find(o => o.category === 'Odu Meji' && o.pattern_right === patternStr);
    return entry ? entry.slug : null;
}

function findOduByLegs(rightArr, leftArr) {
    const rightStr = rightArr.join(',');
    const leftStr = leftArr.join(',');
    if (rightStr === leftStr) {
        // Odu Meji
        return allOdu.find(o => o.category === 'Odu Meji' && o.pattern_right === rightStr);
    }
    // Omo Odu — match by parent slugs derived from pattern lookups
    const rightSlug = findMejiSlugByPattern(rightArr);
    const leftSlug = findMejiSlugByPattern(leftArr);
    if (!rightSlug || !leftSlug) return null;
    return allOdu.find(o => o.category === 'Omo Odu' && o.parent1 === rightSlug && o.parent2 === leftSlug);
}

function renderLeg(container, marks, animate) {
    container.innerHTML = '';
    marks.forEach((mark, i) => {
        const div = document.createElement('div');
        div.className = `cast-mark ${mark === 'I' ? 'single' : 'double'}`;
        div.style.opacity = '0';
        container.appendChild(div);
        if (animate) {
            setTimeout(() => { div.style.transition = 'opacity 0.3s'; div.style.opacity = '1'; }, i * 120);
        } else {
            div.style.opacity = '1';
        }
    });
}

function setupCastWidget() {
    const btn = document.getElementById('castBtn');
    const legRight = document.getElementById('castLegRight');
    const legLeft = document.getElementById('castLegLeft');
    const resultEl = document.getElementById('castResult');
    if (!btn) return;

    btn.addEventListener('click', () => {
        btn.classList.add('casting');
        btn.innerHTML = '<i class="fas fa-dice"></i> Casting…';
        resultEl.innerHTML = '<p class="cast-placeholder">Casting your Odù…</p>';

        const right = randomLeg();
        const left = randomLeg();

        renderLeg(legRight, right, true);
        renderLeg(legLeft, left, true);

        setTimeout(() => {
            const found = findOduByLegs(right, left);
            if (found) {
                resultEl.innerHTML = `
                    <h3>${found.title}</h3>
                    <p class="cast-result-sub">Odù #${found.number} · ${found.category}</p>
                    <p>${found.excerpt}</p>
                    <a href="#${found.slug}" class="btn btn-primary btn-sm view-cast-result">Read Full Meaning <i class="fas fa-arrow-right"></i></a>
                `;
                resultEl.querySelector('.view-cast-result')?.addEventListener('click', (e) => {
                    e.preventDefault();
                    openModal(found.id);
                });
            } else {
                resultEl.innerHTML = '<p class="cast-placeholder">Could not match this cast — please try again.</p>';
            }
            btn.classList.remove('casting');
            btn.innerHTML = '<i class="fas fa-dice"></i> Cast Again';
        }, 700);
    });
}

/* ===================== Odù Explorer (manual picker) ===================== */

function setupPicker() {
    const selL = document.getElementById('pickLeft');
    const selR = document.getElementById('pickRight');
    if (!selL || !selR) return;

    const mejis = allOdu
        .filter(o => o.category === 'Odu Meji')
        .sort((a, b) => Number(a.number) - Number(b.number));
    if (mejis.length === 0) return;

    const options = mejis.map(m => `<option value="${m.slug}">${m.title}</option>`).join('');
    selL.innerHTML = options;
    selR.innerHTML = options;

    const bySlug = slug => mejis.find(m => m.slug === slug);
    const marksOf = m => (m.pattern_right || '').split(',').filter(Boolean);

    function update() {
        const left = bySlug(selL.value);
        const right = bySlug(selR.value);
        if (!left || !right) return;

        renderLeg(document.getElementById('pickLegLeft'), marksOf(left), false);
        renderLeg(document.getElementById('pickLegRight'), marksOf(right), false);
        document.getElementById('pickNameLeft').textContent = left.title;
        document.getElementById('pickNameRight').textContent = right.title;

        const found = findOduByLegs(marksOf(right), marksOf(left));
        const out = document.getElementById('pickResult');
        if (!found) {
            out.innerHTML = '<p class="cast-placeholder">No matching Odù found for this pair.</p>';
            return;
        }
        const pageSlug = String(found.id || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        const hasPage = found.category === 'Odu Meji';
        const kind = found.category === 'Odu Meji'
            ? 'Odù Méjì — a principal figure (both sides the same)'
            : `Omo Odù — ${right.title} (right) combined with ${left.title} (left)`;
        out.innerHTML = `
            <h3>${found.title}</h3>
            <p class="cast-result-sub">Odù #${found.number} · ${kind}</p>
            <p>${found.excerpt || ''}</p>
            <a href="${hasPage ? `read/odu/${pageSlug}.html` : `#${found.slug}`}" class="btn btn-primary btn-sm picker-open">Read Full Meaning <i class="fas fa-arrow-right"></i></a>
        `;
        if (!hasPage) {
            out.querySelector('.picker-open').addEventListener('click', e => {
                e.preventDefault();
                openModal(found.id);
            });
        }
    }

    selL.addEventListener('change', update);
    selR.addEventListener('change', update);
    document.getElementById('pickSwap')?.addEventListener('click', () => {
        const t = selL.value; selL.value = selR.value; selR.value = t; update();
    });
    document.getElementById('pickRandom')?.addEventListener('click', () => {
        selL.selectedIndex = Math.floor(Math.random() * mejis.length);
        selR.selectedIndex = Math.floor(Math.random() * mejis.length);
        update();
    });

    // Start on the first figure on both sides (Ogbè Ogbè)
    selL.selectedIndex = 0;
    selR.selectedIndex = 0;
    update();
}

document.addEventListener('DOMContentLoaded', loadOduData);
