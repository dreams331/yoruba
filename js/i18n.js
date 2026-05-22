/**
 * Yoruba Heritage — Language Switcher
 * - English:    default (no translation)
 * - Yorùbá:     custom curated UI translations (instant, no reload)
 * - PT/ES/FR:   Google Translate widget driven programmatically
 *               — all GT native UI is fully hidden via CSS
 */

// ── Yoruba UI Translations ─────────────────────────────────────────────────
const yorubaTranslations = {
    'Home': 'Ilé', 'Articles': 'Àwọn Ìwé', 'Stories': 'Àwọn Ìtàn',
    'IFA Wisdom': 'Ọgbọ́n IFÁ', 'Gallery': 'Gbọ̀ngàn Àwòrán',
    'About': 'Nípa Wa', 'Search': 'Àwárí', 'Diaspora': 'Àwọn Tó Tàn Kálẹ̀',
    'Read More': 'Ka Síwájú', 'Read Full Article': 'Ka Ìwé Kún',
    'Read Story': 'Ka Ìtàn', 'Subscribe': 'Forúkọ Sílẹ̀',
    'Submit': 'Firánṣẹ́', 'Send Message': 'Firánṣẹ́ Ìfiránṣẹ́',
    'Back to Stories': 'Padà sí Àwọn Ìtàn', 'Back to Articles': 'Padà sí Àwọn Ìwé',
    'Back to IFA Wisdom': 'Padà sí Ọgbọ́n IFÁ', 'Copy Link': 'Daakọ Atọ́ka',
    'Share': 'Pín', 'Discussion': 'Ìjíròrò', 'More Stories': 'Àwọn Ìtàn Mìíràn',
    'Related Articles': 'Àwọn Ìwé Tó Jọ', 'More IFA Wisdom': 'Ọgbọ́n IFÁ Síwájú',
    'Newsletter': 'Ìròyìn Ìgbàgbogbo', 'Quick Links': 'Àwọn Atọ́ka Ìyára',
    'Resources': 'Àwọn Ohun Èlò', 'Loading...': 'Ń gbé wọlé…',
    'All rights reserved.': 'Gbogbo ẹ̀tọ́ ni a tọ́jú.',
    'Your email address': 'Àdírẹ́sì ìmèéìlì rẹ', 'Your Name': 'Orúkọ Rẹ',
    'Your Email': 'Ìmèéìlì Rẹ', 'Your Message': 'Ìfiránṣẹ́ Rẹ',
    'Comments': 'Àwọn Ìdáhùn', '0 Comments': 'Kò sí Ìdáhùn',
};

// ── Language Config ────────────────────────────────────────────────────────
const LANGUAGES = [
    { code: 'en', label: 'English',   flag: '🇬🇧' },
    { code: 'yo', label: 'Yorùbá',    flag: '🌍'  },
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'es', label: 'Español',   flag: '🇪🇸' },
    { code: 'fr', label: 'Français',  flag: '🇫🇷' },
];

// ── Google Translate — widget driven silently (no page reload) ─────────────
let _gtReady = false;
let _gtPending = null;

function ensureGTWidget() {
    if (document.getElementById('google_translate_element')) return;

    // Tiny invisible container — GT needs a DOM target
    const el = document.createElement('div');
    el.id = 'google_translate_element';
    el.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;left:-9999px;';
    document.body.appendChild(el);

    window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement(
            { pageLanguage: 'en', includedLanguages: 'pt,es,fr', autoDisplay: false },
            'google_translate_element'
        );
        _gtReady = true;
        if (_gtPending) { triggerGT(_gtPending); _gtPending = null; }
    };

    const s = document.createElement('script');
    s.id = 'gt-script';
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.onerror = () => console.warn('Google Translate failed to load — check your connection.');
    document.body.appendChild(s);
}

function triggerGT(lang) {
    if (!_gtReady) { _gtPending = lang; ensureGTWidget(); return; }
    const trySet = (attempts) => {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
            select.value = lang;
            select.dispatchEvent(new Event('change'));
        } else if (attempts > 0) {
            setTimeout(() => trySet(attempts - 1), 300);
        }
    };
    trySet(12); // try for ~3.6 seconds
}

function resetGT() {
    const select = document.querySelector('.goog-te-combo');
    if (select) { select.value = ''; select.dispatchEvent(new Event('change')); }
    ['', '; domain=' + location.hostname].forEach(d =>
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${d}`
    );
}

// ── Yoruba custom translation ──────────────────────────────────────────────
function applyYorubaTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (yorubaTranslations[key]) el.textContent = yorubaTranslations[key];
    });
    document.querySelectorAll('.nav-menu a, .btn, .article-link, .back-link, .filter-btn').forEach(el => {
        const txt = el.textContent.trim();
        if (yorubaTranslations[txt]) el.textContent = yorubaTranslations[txt];
    });
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
        const ph = el.getAttribute('placeholder');
        if (yorubaTranslations[ph]) el.setAttribute('placeholder', yorubaTranslations[ph]);
    });
}

// ── Apply language ─────────────────────────────────────────────────────────
function applyLanguage(code) {
    const prev = localStorage.getItem('yh-lang') || 'en';
    localStorage.setItem('yh-lang', code);

    document.querySelectorAll('.lang-option').forEach(btn =>
        btn.classList.toggle('active', btn.dataset.lang === code)
    );

    // If leaving PT/ES/FR, reset GT first
    if (['pt','es','fr'].includes(prev) && !['pt','es','fr'].includes(code)) resetGT();

    if (code === 'en') {
        if (prev === 'yo') { window.location.reload(); return; } // restore DOM text
        return;
    }
    if (code === 'yo') { applyYorubaTranslations(); return; }

    // PT / ES / FR — use GT widget silently
    triggerGT(code);
}

// ── Build the switcher widget ──────────────────────────────────────────────
function buildLangSwitcher() {
    const navMenu = document.getElementById('navMenu');
    if (!navMenu || document.getElementById('langSwitcher')) return;

    const saved = localStorage.getItem('yh-lang') || 'en';

    const li = document.createElement('li');
    li.id = 'langSwitcher';
    li.className = 'lang-switcher';
    li.innerHTML = `
        <button id="langTrigger" class="lang-trigger" aria-label="Change language">
            <i class="fas fa-globe"></i>
            <span>Languages</span>
            <i class="fas fa-chevron-down lang-chevron"></i>
        </button>
        <ul class="lang-dropdown" role="menu">
            ${LANGUAGES.map(l => `
                <li role="none">
                    <button class="lang-option ${l.code === saved ? 'active' : ''}"
                            data-lang="${l.code}" role="menuitem">
                        <span class="lang-flag">${l.flag}</span>
                        <span class="lang-name">${l.label}</span>
                        ${l.code === saved ? '<i class="fas fa-check lang-check"></i>' : ''}
                    </button>
                </li>`).join('')}
        </ul>
    `;
    navMenu.appendChild(li);

    const trigger = document.getElementById('langTrigger');
    trigger.addEventListener('click', e => { e.stopPropagation(); li.classList.toggle('open'); });
    document.addEventListener('click', () => li.classList.remove('open'));

    li.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', () => {
            li.classList.remove('open');
            li.querySelectorAll('.lang-check').forEach(i => i.remove());
            btn.insertAdjacentHTML('beforeend', '<i class="fas fa-check lang-check"></i>');
            applyLanguage(btn.dataset.lang);
        });
    });

    // Re-apply saved language on page load
    if (saved === 'yo') {
        applyYorubaTranslations();
    } else if (['pt','es','fr'].includes(saved)) {
        ensureGTWidget(); // pre-load GT, _gtPending = saved will fire after init
        _gtPending = saved;
    }
}

document.addEventListener('DOMContentLoaded', buildLangSwitcher);
