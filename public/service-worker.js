const CACHE_NAME = 'v1';
const CACHE_URLS = [
  '/index.html'
];

self.addEventListener("install", (event) => {
  // console.log("Service Worker installing.");
  event.waitUntil(
  caches.open(CACHE_NAME).then((cache) => {
    return Promise.all(
      CACHE_URLS.map(async (url) => {
        try {
          const response = await fetch(url);
          if (response.ok) {
            await cache.put(url, response.clone());
          } else {
            console.warn(`Fetch failed for ${url}`, response.status);
          }
        } catch (err) {
          console.error(`Error fetching ${url}:`, err);
        }
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
      return cachedResponse;
    })
  );
});
