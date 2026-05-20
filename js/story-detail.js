/**
 * Story Detail Page
 * Loads a single story by slug (id param) from data/stories.json
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
        .replace(/\n{2,}/g, '</p><p>')
        .replace(/^(?!<[hH\d]|<ul|<hr|<li)(.+)$/gm, (m) => m.startsWith('<') ? m : m)
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

async function initStoryDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || params.get('slug');

    if (!id) {
        document.getElementById('storyContent').innerHTML = '<p>Story not found. <a href="stories.html">Back to Stories</a></p>';
        return;
    }

    try {
        const res = await fetch('/data/stories.json');
        const stories = await res.json();

        // Find by slug or numeric index
        let story = stories.find(s => s.id === id);
        if (!story) story = stories[parseInt(id) - 1];

        if (!story) {
            document.getElementById('storyContent').innerHTML = `<p>Story not found. <a href="stories.html">Back to Stories</a></p>`;
            return;
        }

        // Update page title
        document.title = `${story.title} — Yoruba Heritage`;

        // Category badge
        document.getElementById('storyCategory').textContent = story.category.charAt(0).toUpperCase() + story.category.slice(1);

        // Title
        document.getElementById('storyTitle').textContent = story.title;

        // Date & read time
        const date = story.date ? new Date(story.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
        document.getElementById('storyDate').textContent = date;
        document.getElementById('storyReadTime').textContent = story.readTime || '6 min';

        // Featured image
        if (story.image) {
            document.getElementById('storyImage').innerHTML = `<img src="${story.image}" alt="${story.title}" style="width:100%;max-height:500px;object-fit:cover;">`;
        }

        // Content
        const html = story.htmlContent || markdownToHtml(story.content) || `<p>${story.excerpt}</p>`;
        document.getElementById('storyContent').innerHTML = html;

        // Moral box
        if (story.moral) {
            document.getElementById('storyMoral').innerHTML = `
                <div class="moral-box">
                    <i class="fas fa-feather-alt"></i>
                    <div>
                        <strong>Moral of the Story</strong>
                        <p>${story.moral}</p>
                    </div>
                </div>`;
        }

        // Related stories (same category, exclude current)
        const related = stories.filter(s => s.id !== story.id && s.category === story.category).slice(0, 3);
        const relatedGrid = document.getElementById('relatedStories');
        if (related.length > 0) {
            relatedGrid.innerHTML = related.map(s => `
                <div class="related-article-card">
                    <img src="${s.image || '/images/uploads/ijapa.png'}" alt="${s.title}" onerror="this.src='/images/uploads/ijapa.png'">
                    <div class="related-article-info">
                        <span class="related-category">${s.category}</span>
                        <h4>${s.title}</h4>
                        <a href="story-detail.html?id=${s.id}" class="related-link">Read Story <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>`).join('');
        }

        // Reading progress bar
        const bar = document.getElementById('reading-progress-bar');
        if (bar) {
            window.addEventListener('scroll', () => {
                const docH = document.documentElement.scrollHeight - window.innerHeight;
                bar.style.width = (window.scrollY / docH * 100) + '%';
            });
        }

    } catch (err) {
        console.error('Story detail error:', err);
        document.getElementById('storyContent').innerHTML = '<p>Could not load story. <a href="stories.html">Back to Stories</a></p>';
    }
}

document.addEventListener('DOMContentLoaded', initStoryDetail);
