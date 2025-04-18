const CACHE_NAME = 'v1';
const CACHE_URLS = [
  '/index.html'
];

self.addEventListener("install", (event) => {
  // console.log("Service Worker installing.");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // console.log("Caching assets");
      // Fetch each URL and cache it
      return Promise.all(
        CACHE_URLS.map((url) => {
          return fetch(url)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to fetch ${url}`);
              }
              return cache.put(url, response);
            })
            .catch((error) => {
              // console.error(`Failed to cache ${url}:`, error);
            });
        })
      );
    })
  );
});

self.addEventListener("activate", (event) => {
  // console.log("Service Worker activating.");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            // console.log("Deleting old cache", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if available, else fetch from network
      return cachedResponse || fetch(event.request);
    })
  );
});
