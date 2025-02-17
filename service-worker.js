const CACHE_NAME = 'pwa-word-processor-v2'; // Update cache name when changing files
const urlsToCache = [
    '/projects/alpha/webTextEditor/',
    '/projects/alpha/webTextEditor/index.html',
    '/projects/alpha/webTextEditor/styles.css',
    '/projects/alpha/webTextEditor/script.js',
    '/projects/alpha/webTextEditor/manifest.json'
];

// Install Service Worker & Cache Files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching assets...');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate Service Worker & Remove Old Caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch Requests - Cache First, Then Network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response; // Return cached version
            }
            return fetch(event.request).then(networkResponse => {
                return caches.open(CACHE_NAME).then(cache => {
                    if (event.request.url.startsWith('http')) { // Only cache GET requests
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                });
            });
        }).catch(() => caches.match('/index.html')) // Fallback for offline mode
    );
});
