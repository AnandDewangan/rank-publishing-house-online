const CACHE_NAME = "v1";
const CACHE_URLS = ["/index.html", "/"]; // Add more static assets as needed

// ✅ Install: Pre-cache essential resources
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching assets...");
      return cache.addAll(CACHE_URLS);
    })
  );
});

// ✅ Activate: Cleanup old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[Service Worker] Removing old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          // Validate the response
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type === "opaque"
          ) {
            return networkResponse;
          }

          // ✅ Clone before cache so we don’t consume the stream
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return networkResponse; // Safe to return original
        })
        .catch((err) => {
          console.warn("[Service Worker] Fetch failed:", err);
          return cachedResponse; // fallback to cache if fetch fails
        });

      return cachedResponse || fetchPromise;
    })
  );
});

