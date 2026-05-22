/**
 * Yoruba Heritage — Language Switcher
 * - Yoruba: custom curated translations for all UI text
 * - Portuguese, Spanish, French: Google Translate
 * - English: default (no translation)
 * Language choice is saved in localStorage.
 */

// ── Yoruba UI Translations ─────────────────────────────────────────────────
const yorubaTranslations = {
    // Navigation
    'Home':                         'Ilé',
    'Articles':                     'Àwọn Ìwé',
    'Stories':                      'Àwọn Ìtàn',
    'IFA Wisdom':                   'Ọgbọ́n IFÁ',
    'Gallery':                      'Gbọ̀ngàn Àwòrán',
    'About':                        'Nípa Wa',
    'Search':                       'Àwárí',
    'Diaspora':                     'Àwọn Tó Tàn Kálẹ̀',

    // Buttons & actions
    'Read More':                    'Ka Síwájú',
    'Read Full Article':            'Ka Ìwé Kún',
    'Read Story':                   'Ka Ìtàn',
    'Subscribe':                    'Forúkọ Sílẹ̀',
    'Submit':                       'Firánṣẹ́',
    'Send Message':                 'Firánṣẹ́ Ìfiránṣẹ́',
    'Back to Stories':              'Padà sí Àwọn Ìtàn',
    'Back to Articles':             'Padà sí Àwọn Ìwé',
    'Back to IFA Wisdom':           'Padà sí Ọgbọ́n IFÁ',
    'Copy Link':                    'Daakọ Atọ́ka',
    'Share':                        'Pín',

    // Section headings
    'Discussion':                   'Ìjíròrò',
    'More Stories':                 'Àwọn Ìtàn Mìíràn',
    'Related Articles':             'Àwọn Ìwé Tó Jọ',
    'More IFA Wisdom':              'Ọgbọ́n IFÁ Síwájú',
    'Share this story':             'Pín Ìtàn Yìí',
    'Share this article':           'Pín Ìwé Yìí',
    'Newsletter':                   'Ìròyìn Ìgbàgbogbo',
    'Quick Links':                  'Àwọn Atọ́ka Ìyára',
    'Resources':                    'Àwọn Ohun Èlò',
    'Social Media':                 'Àwùjọ Alátakò',

    // Footer
    'Stay updated with new content and discoveries':
        'Máa ṣe ìmúdójúìwọ̀n pẹ̀lú àwọn àkóónú àti àwárí tuntun',
    'Preserving and sharing the rich history, culture, and wisdom of the Yoruba people worldwide.':
        'Títọ́jú àti pínpín ìtàn àgbàyanu, àṣà, àti ọgbọ́n àwọn ará Yorùbá káàkiri àgbáyé.',
    'All rights reserved.':         'Gbogbo ẹ̀tọ́ ni a tọ́jú.',
    'Built with respect for our ancestors':
        'Ti a kọ́ pẹ̀lú ọ̀wọ̀ fún àwọn baba wa',

    // Meta / page headers
    'Loading...':                   'Ń gbé wọlé…',
    'Loading story...':             'Ń gbé ìtàn wọlé…',
    'Oral Tradition':               'Àṣà Ẹnu',
    'Folktale':                     'Ìtàn Àgbàdo',
    'Legend':                       'Ìtàn Àkọsílẹ̀',
    'Myth':                         'Ìtàn Ìjìnlẹ̀',
    'Parable':                      'Òwe',
    'History':                      'Ìtàn Ìgbàkọ̀kan',
    'Culture':                      'Àṣà Ìbílẹ̀',
    'Religion':                     'Ẹ̀sìn',
    'Language':                     'Èdè',
    'Diaspora':                     'Àwọn Tó Tàn Kálẹ̀',

    // Common UI
    'Your email address':           'Àdírẹ́sì ìmèéìlì rẹ',
    'Your Name':                    'Orúkọ Rẹ',
    'Your Email':                   'Ìmèéìlì Rẹ',
    'Your Message':                 'Ìfiránṣẹ́ Rẹ',
    'min read':                     'ìṣẹ́jú kíkà',
    'Comments':                     'Àwọn Ìdáhùn',
    '0 Comments':                   'Kò sí Ìdáhùn',
};

// ── Language Config ────────────────────────────────────────────────────────
const LANGUAGES = [
    { code: 'en',  label: 'English',    flag: '🇬🇧', gt: null      },
    { code: 'yo',  label: 'Yorùbá',     flag: '🌍',  gt: null      }, // custom
    { code: 'pt',  label: 'Português',  flag: '🇧🇷', gt: 'pt'     },
    { code: 'es',  label: 'Español',    flag: '🇪🇸', gt: 'es'     },
    { code: 'fr',  label: 'Français',   flag: '🇫🇷', gt: 'fr'     },
];

// ── Google Translate loader ────────────────────────────────────────────────
function loadGoogleTranslate(targetLang) {
    // Remove any existing GT elements
    removeGoogleTranslate();

    window._gtLang = targetLang;

    window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement(
            { pageLanguage: 'en', includedLanguages: 'pt,es,fr', autoDisplay: false },
            'google_translate_element'
        );
        // Trigger the language after a short delay for the widget to initialise
        setTimeout(() => triggerGoogleTranslate(targetLang), 800);
    };

    const s = document.createElement('script');
    s.id = 'gt-script';
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(s);
}

function triggerGoogleTranslate(lang) {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));
    } else {
        setTimeout(() => triggerGoogleTranslate(lang), 400);
    }
}

function removeGoogleTranslate() {
    // Remove script
    const s = document.getElementById('gt-script');
    if (s) s.remove();
    // Remove GT iframe/banner
    const frame = document.getElementById(':1.container');
    if (frame) frame.remove();
    // Reset cookie so GT stops translating
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + location.hostname;
    // Remove the hidden GT element
    const el = document.getElementById('google_translate_element');
    if (el) el.innerHTML = '';
    // Force reload to clear GT translation (cleanest approach)
    if (window._gtActive) {
        window._gtActive = false;
        window.location.reload();
    }
}

// ── Yoruba custom translation ──────────────────────────────────────────────
function applyYorubaTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (yorubaTranslations[key]) el.textContent = yorubaTranslations[key];
    });

    // Also walk text nodes for nav links and common buttons
    document.querySelectorAll('.nav-menu a, .btn, .article-link, .back-link, .filter-btn').forEach(el => {
        const txt = el.textContent.trim();
        if (yorubaTranslations[txt]) el.textContent = yorubaTranslations[txt];
    });

    // Placeholders
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
        const ph = el.getAttribute('placeholder');
        if (yorubaTranslations[ph]) el.setAttribute('placeholder', yorubaTranslations[ph]);
    });
}

function removeYorubaTranslations() {
    // Reload to restore English (simplest & most reliable)
    if (window._yoActive) {
        window._yoActive = false;
        window.location.reload();
    }
}

// ── Apply / remove language ────────────────────────────────────────────────
function applyLanguage(code) {
    const prev = localStorage.getItem('yh-lang') || 'en';
    localStorage.setItem('yh-lang', code);

    // Update active state on switcher
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === code);
    });

    // Update the switcher label
    const lang = LANGUAGES.find(l => l.code === code);
    const trigger = document.getElementById('langTrigger');
    if (trigger && lang) trigger.innerHTML = `${lang.flag} <span>${lang.label}</span> <i class="fas fa-chevron-down"></i>`;

    if (code === 'en') {
        // Coming back to English — reload if something was active
        if (prev !== 'en') window.location.reload();
        return;
    }

    if (code === 'yo') {
        window._yoActive = true;
        applyYorubaTranslations();
        return;
    }

    // PT / ES / FR — Google Translate
    window._gtActive = true;
    loadGoogleTranslate(code);
}

// ── Build the switcher widget ──────────────────────────────────────────────
function buildLangSwitcher() {
    const navMenu = document.getElementById('navMenu');
    if (!navMenu || document.getElementById('langSwitcher')) return;

    const saved = localStorage.getItem('yh-lang') || 'en';
    const current = LANGUAGES.find(l => l.code === saved) || LANGUAGES[0];

    // Hidden GT container (required by Google Translate API)
    const gtEl = document.createElement('div');
    gtEl.id = 'google_translate_element';
    gtEl.style.display = 'none';
    document.body.appendChild(gtEl);

    // Build dropdown HTML
    const li = document.createElement('li');
    li.id = 'langSwitcher';
    li.className = 'lang-switcher';
    li.innerHTML = `
        <button id="langTrigger" class="lang-trigger" aria-label="Change language">
            ${current.flag} <span>${current.label}</span> <i class="fas fa-chevron-down"></i>
        </button>
        <ul class="lang-dropdown">
            ${LANGUAGES.map(l => `
                <li>
                    <button class="lang-option ${l.code === saved ? 'active' : ''}" data-lang="${l.code}">
                        <span class="lang-flag">${l.flag}</span>
                        <span class="lang-name">${l.label}</span>
                    </button>
                </li>
            `).join('')}
        </ul>
    `;
    navMenu.appendChild(li);

    // Toggle dropdown
    const trigger = document.getElementById('langTrigger');
    const dropdown = li.querySelector('.lang-dropdown');
    trigger.addEventListener('click', e => {
        e.stopPropagation();
        li.classList.toggle('open');
    });
    document.addEventListener('click', () => li.classList.remove('open'));

    // Language selection
    li.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', () => {
            li.classList.remove('open');
            applyLanguage(btn.dataset.lang);
        });
    });

    // Re-apply saved language on page load (except en which is default)
    if (saved !== 'en') {
        if (saved === 'yo') {
            window._yoActive = true;
            applyYorubaTranslations();
        } else {
            window._gtActive = true;
            loadGoogleTranslate(saved);
        }
    }
}

document.addEventListener('DOMContentLoaded', buildLangSwitcher);
