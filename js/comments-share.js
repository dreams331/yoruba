/**
 * Floating Share Bar + Giscus Comments
 * Include this on article-detail, story-detail, and ifa-detail pages.
 */

// ── Floating Share Bar ─────────────────────────────────────────────────────
function initFloatingShare() {
    const bar = document.createElement('div');
    bar.className = 'floating-share';
    bar.innerHTML = `
        <span class="float-share-label">SHARE</span>
        <button class="float-share-btn fb" title="Share on Facebook" onclick="floatShare('facebook')">
            <i class="fab fa-facebook-f"></i>
        </button>
        <button class="float-share-btn tw" title="Share on Twitter / X" onclick="floatShare('twitter')">
            <i class="fab fa-twitter"></i>
        </button>
        <button class="float-share-btn wa" title="Share on WhatsApp" onclick="floatShare('whatsapp')">
            <i class="fab fa-whatsapp"></i>
        </button>
        <button class="float-share-btn copy" title="Copy link" onclick="floatShare('copy')" id="floatCopyBtn">
            <i class="fas fa-link"></i>
        </button>
    `;
    document.body.appendChild(bar);

    // Show after scrolling 300px
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            bar.classList.add('visible');
        } else {
            bar.classList.remove('visible');
        }
    });
}

function floatShare(platform) {
    const url   = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const links = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter:  `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
        whatsapp: `https://wa.me/?text=${title}%20${url}`,
    };

    if (platform === 'copy') {
        navigator.clipboard.writeText(window.location.href).then(() => {
            const btn = document.getElementById('floatCopyBtn');
            if (btn) {
                btn.innerHTML = '<i class="fas fa-check"></i>';
                btn.style.background = '#2e7d32';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-link"></i>';
                    btn.style.background = '';
                }, 2000);
            }
        });
    } else if (links[platform]) {
        window.open(links[platform], '_blank', 'width=600,height=400');
    }
}

// ── Giscus Comments ────────────────────────────────────────────────────────
function initGiscus(containerId = 'giscus-comments') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

    const script = document.createElement('script');
    script.src            = 'https://giscus.app/client.js';
    script.setAttribute('data-repo',              'dreams331/yoruba');
    script.setAttribute('data-repo-id',           'R_kgDOQIfzTg');
    script.setAttribute('data-category',          'General');
    script.setAttribute('data-category-id',       'DIC_kwDOQIfzTs4C9ffZ');
    script.setAttribute('data-mapping',           'pathname');
    script.setAttribute('data-strict',            '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata',     '0');
    script.setAttribute('data-input-position',    'top');
    script.setAttribute('data-theme',             theme);
    script.setAttribute('data-lang',              'en');
    script.setAttribute('data-loading',           'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    container.appendChild(script);
}

document.addEventListener('DOMContentLoaded', () => {
    initFloatingShare();
    initGiscus();
});
