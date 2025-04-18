const CACHE_NAME = "v1";
const CACHE_URLS = ["/index.html"];

self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log("[Service Worker] Caching assets...");
      try {
        for (const url of CACHE_URLS) {
          const response = await fetch(url);
          if (response.ok) {
            await cache.put(url, response.clone());
          } else {
            console.warn(`[Service Worker] Failed to fetch ${url}:`, response.status);
          }
        }
      } catch (err) {
        console.error("[Service Worker] Installation error:", err);
      }
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[Service Worker] Deleting old cache:", cacheName);
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
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then((networkResponse) => {
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type === "opaque"
          ) {
            return networkResponse;
          }

          const clonedResponse = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clonedResponse).catch((err) => {
              console.warn("[Service Worker] Cache put failed:", err);
            });
          });

          return networkResponse;
        })
        .catch((err) => {
          console.error("[Service Worker] Fetch failed:", err);
          return new Response(
            "⚠️ You are offline and this resource is not cached.",
            {
              status: 503,
              statusText: "Service Unavailable",
              headers: { "Content-Type": "text/plain" },
            }
          );
        });
    })
  );
});
