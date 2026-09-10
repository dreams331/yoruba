/**
 * Video Embed Helper
 * Converts YouTube/Vimeo URLs into safe, responsive iframe embeds.
 * Free approach — no hosting, no bandwidth cost, always credits/links to original creator.
 */

function getYouTubeId(url) {
    if (!url) return null;
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
    ];
    for (const p of patterns) {
        const m = url.match(p);
        if (m) return m[1];
    }
    return null;
}

function getVimeoId(url) {
    if (!url) return null;
    const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return m ? m[1] : null;
}

/**
 * Returns an HTML string with a responsive video embed, or null if the URL
 * isn't a recognized YouTube/Vimeo link.
 */
function buildVideoEmbed(url, opts = {}) {
    const title = opts.title || 'Video';
    const ytId = getYouTubeId(url);
    if (ytId) {
        return `<div class="video-embed-wrap">
            <iframe src="https://www.youtube-nocookie.com/embed/${ytId}" title="${escapeHtml(title)}"
                loading="lazy" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
        </div>`;
    }
    const vId = getVimeoId(url);
    if (vId) {
        return `<div class="video-embed-wrap">
            <iframe src="https://player.vimeo.com/video/${vId}" title="${escapeHtml(title)}"
                loading="lazy" frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        </div>`;
    }
    return null;
}

function getYouTubeThumbnail(url) {
    const id = getYouTubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
