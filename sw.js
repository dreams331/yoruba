/**
 * Yoruba Heritage — Service Worker
 * Caches core assets for offline use and fast loading
 */

const CACHE_NAME = 'yoruba-heritage-v1';
const CACHE_TIMEOUT = 3000; // ms before falling back to cache

// Core assets to pre-cache on install
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/yoruba-calendar.html',
    '/articles.html',
    '/stories.html',
    '/ifa-wisdom.html',
    '/gallery.html',
    '/about.html',
    '/css/styles.css',
    '/css/yoruba-calendar.css',
    '/js/main.js',
    '/js/yoruba-calendar.js',
    '/images/favicon.png',
    '/offline.html',
];

// ── Install: pre-cache core assets ────────────────────────────────────────
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// ── Activate: clean up old caches ─────────────────────────────────────────
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// ── Fetch: network first, fall back to cache ──────────────────────────────
self.addEventListener('fetch', event => {
    // Skip non-GET and cross-origin requests
    if (event.request.method !== 'GET') return;
    if (!event.request.url.startsWith(self.location.origin)) return;

    // For HTML pages: network first, cache fallback
    if (event.request.headers.get('accept')?.includes('text/html')) {
        event.respondWith(
            fetch(event.request)
                .then(res => {
                    const clone = res.clone();
                    caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
                    return res;
                })
                .catch(() =>
                    caches.match(event.request)
                        .then(cached => cached || caches.match('/offline.html'))
                )
        );
        return;
    }

    // For everything else: cache first, network fallback
    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;
            return fetch(event.request).then(res => {
                const clone = res.clone();
                caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
                return res;
            });
        })
    );
});
