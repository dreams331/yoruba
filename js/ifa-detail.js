/**
 * IFA Detail Page
 * Loads a single IFA entry by slug (id param) from data/ifa.json
 */

function markdownToHtml(md) {
    if (!md) return '';
    return md
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/^---$/gm, '<hr>')
        .replace(/^\* (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
        .split('\n\n').map(p => {
            p = p.trim();
            if (!p) return '';
            if (/^<(h[1-6]|ul|ol|hr|blockquote)/.test(p)) return p;
            return `<p>${p}</p>`;
        }).join('\n');
}

function shareItem(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const links = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
        whatsapp: `https://wa.me/?text=${title}%20${url}`
    };
    if (links[platform]) window.open(links[platform], '_blank', 'width=600,height=400');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        const btn = document.querySelector('.share-btn.copy');
        if (btn) { btn.innerHTML = '<i class="fas fa-check"></i> Copied!'; setTimeout(() => { btn.innerHTML = '<i class="fas fa-link"></i> Copy Link'; }, 2000); }
    });
}

async function initIfaDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || params.get('slug');

    if (!id) {
        document.getElementById('ifaContent').innerHTML = '<p>Entry not found. <a href="ifa-wisdom.html">Back to IFA Wisdom</a></p>';
        return;
    }

    try {
        const res = await fetch('/data/ifa.json');
        const entries = await res.json();

        let entry = entries.find(e => e.id === id);
        if (!entry) entry = entries[parseInt(id) - 1];

        if (!entry) {
            document.getElementById('ifaContent').innerHTML = `<p>Entry not found. <a href="ifa-wisdom.html">Back to IFA Wisdom</a></p>`;
            return;
        }

        document.title = `${entry.title} — IFA Wisdom — Yoruba Heritage`;

        // ── Dynamic SEO ──────────────────────────────────────────────────────
        const pageUrl = `https://yorubaheritage.com/ifa-detail.html?id=${id}`;
        const ogImage = (entry.image && entry.image.startsWith('http'))
            ? entry.image
            : `https://yorubaheritage.com/${(entry.image || 'images/uploads/yoruba-people.jpg').replace(/^\//, '')}`;
        const desc = entry.excerpt || '';
        const setMeta = (sel, val) => { const el = document.querySelector(sel); if (el) el.setAttribute('content', val); };
        document.querySelector('meta[name="description"]')?.setAttribute('content', desc);
        setMeta('meta[property="og:title"]', `${entry.title} — IFA Wisdom — Yoruba Heritage`);
        setMeta('meta[property="og:description"]', desc);
        setMeta('meta[property="og:image"]', ogImage);
        setMeta('meta[property="og:url"]', pageUrl);
        setMeta('meta[name="twitter:title"]', `${entry.title} — IFA Wisdom — Yoruba Heritage`);
        setMeta('meta[name="twitter:description"]', desc);
        setMeta('meta[name="twitter:image"]', ogImage);
        document.querySelector('link[rel="canonical"]')?.setAttribute('href', pageUrl);
        const ld = document.createElement('script');
        ld.type = 'application/ld+json';
        ld.textContent = JSON.stringify({
            "@context": "https://schema.org", "@type": "Article",
            "headline": entry.title, "description": desc, "image": ogImage,
            "datePublished": entry.date,
            "author": { "@type": "Organization", "name": "Yoruba Heritage" },
            "publisher": { "@type": "Organization", "name": "Yoruba Heritage",
                "logo": { "@type": "ImageObject", "url": "https://yorubaheritage.com/images/favicon.png" }},
            "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl }
        });
        document.head.appendChild(ld);
        // ── End SEO ──────────────────────────────────────────────────────────

        document.getElementById('ifaCategory').textContent = entry.category || 'IFA Wisdom';
        document.getElementById('ifaTitle').textContent = entry.title;

        const date = entry.date ? new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
        document.getElementById('ifaDate').textContent = date;
        document.getElementById('ifaReadTime').textContent = entry.readTime || '10 min';

        if (entry.image) {
            document.getElementById('ifaImage').innerHTML = `<img src="${entry.image}" alt="${entry.title}" style="width:100%;max-height:500px;object-fit:cover;" onerror="this.src='/images/uploads/ifa.png'">`;
        }

        const html = entry.htmlContent || markdownToHtml(entry.content) || `<p>${entry.excerpt}</p>`;
        document.getElementById('ifaContent').innerHTML = html;

        // Related IFA entries
        const related = entries.filter(e => e.id !== entry.id).slice(0, 3);
        const relatedGrid = document.getElementById('relatedIfa');
        if (related.length > 0) {
            relatedGrid.innerHTML = related.map(e => `
                <div class="related-article-card">
                    <img src="${e.image || '/images/uploads/ifa.png'}" alt="${e.title}" onerror="this.src='/images/uploads/ifa.png'">
                    <div class="related-article-info">
                        <span class="related-category">${e.category || 'IFA'}</span>
                        <h4>${e.title}</h4>
                        <a href="ifa-detail.html?id=${e.id}" class="related-link">Read More <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>`).join('');
        }

        const bar = document.getElementById('reading-progress-bar');
        if (bar) {
            window.addEventListener('scroll', () => {
                const docH = document.documentElement.scrollHeight - window.innerHeight;
                bar.style.width = (window.scrollY / docH * 100) + '%';
            });
        }

    } catch (err) {
        console.error('IFA detail error:', err);
        document.getElementById('ifaContent').innerHTML = '<p>Could not load content. <a href="ifa-wisdom.html">Back to IFA Wisdom</a></p>';
    }
}

document.addEventListener('DOMContentLoaded', initIfaDetail);
