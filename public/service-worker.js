const CACHE_NAME = 'v1'; // Increment this when assets change
const CACHE_URLS = [
  '/',
  '/index.html',
  '/static/js/main.js',
  '/static/css/main.css',
  '/static/media/logo.5e350eac0a92c9b8a15f.png',
  '/offline.html', // Fallback page for offline use
  // Add other files you want to cache for offline usage
];

// Install Service Worker and cache files
self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching assets");
      return cache.addAll(CACHE_URLS);
    })
  );
});

// Activate Service Worker and clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - handle cache and network
self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Return from cache if available
      }

      return fetch(event.request).catch(() => {
        // If network fails, fallback to offline.html (ensure it's cached)
        return caches.match('/offline.html');
      });
    })
  );
});
