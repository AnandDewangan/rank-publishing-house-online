const CACHE_NAME = 'v1';
const CACHE_URLS = [
  '/',                                      // Home page
  '/index.html',  
  '/favicon.ico',                            // Favicon (ICO format)
  '/favicon.png',                            // Favicon (PNG format)
  '/logo192.png',                           // Logo 192px
  '/logo512.png',                           // Logo 512px
  '/manifest.json',                         // Manifest file for PWA
  '/open-book.gif',                         // GIF image
  '/robots.txt',                            // Robots.txt file
  '/sitemap.xml',                           // Sitemap XML file
  '/sitemap_4516202.html',                  // Another sitemap file (maybe a generated one)
  '/zohoverify/verifyforzoho.html',         // Zoho verification HTML file
  '/service-worker.js',                     // The service worker itself (although it’s better not to cache this one for updates)
  '/screenshot-desktop1.png',               // Desktop screenshot 1
  '/screenshot-desktop2.png',               // Desktop screenshot 2
  '/screenshot-mobile1.png',                // Mobile screenshot 1
  '/screenshot-mobile2.png', 
  
  // Main HTML file
  '/assets/css/bootstrap-extended.css',     // Bootstrap CSS file
  '/assets/css/bootstrap.min.css',           // Bootstrap CSS file
  '/assets/css/extra-icons.css',             // Additional icons CSS
  '/assets/css/horizontal-menu.css',        // Horizontal menu CSS
  '/assets/css/pace.min.css',               // Pace CSS
  '/assets/js/bootstrap.bundle.min.js',     // Bootstrap JS file
  '/assets/js/dashboard1.js',               // Dashboard JS file
  '/assets/js/dashboard2.js',               // Another dashboard JS file
  '/assets/js/data-widgets.js',             // Widgets JS
  '/assets/js/jquery.min.js',               // jQuery JS file
  '/assets/js/main.js',                     // Main JS file
  '/assets/js/pace.min.js',                 // Pace JS file
  '/assets/images/favicon.png',             // Favicon image
  '/assets/images/avatars/01.png',          // Avatar image 1
  '/assets/images/bg-themes/body-background-1.webp', // Background image
  '/assets/images/gallery/welcome-back-3.png', // Gallery image

  // Fonts
  '/assets/fonts/LineIcons.eot',
  '/assets/fonts/LineIcons.svg',
  '/assets/fonts/LineIcons.ttf',
  '/assets/fonts/LineIcons.woff',
  '/assets/fonts/LineIcons.woff2',
  '/assets/fonts/boxicons.eot',
  '/assets/fonts/boxicons.svg',
  '/assets/fonts/boxicons.ttf',
  '/assets/fonts/boxicons.woff',
  '/assets/fonts/boxicons.woff2',

  // Sass files (these are typically for development purposes, not for caching in production)
  '/assets/sass/blue-theme.css',
  '/assets/sass/blue-theme.css.map',
  '/assets/sass/blue-theme.scss',
  '/assets/sass/bordered-theme.css',
  '/assets/sass/bordered-theme.css.map',
  '/assets/sass/bordered-theme.scss',
  '/assets/sass/dark-theme.css',
  '/assets/sass/dark-theme.css.map',
  '/assets/sass/dark-theme.scss',
  '/assets/sass/main.css',
  '/assets/sass/main.css.map',
  '/assets/sass/main.scss',
  '/assets/sass/responsive.css',
  '/assets/sass/responsive.css.map',
  '/assets/sass/responsive.scss',
  '/assets/sass/semi-dark.css',
  '/assets/sass/semi-dark.css.map',
  '/assets/sass/semi-dark.scss'
];

self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching assets");
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
              console.error(`Failed to cache ${url}:`, error);
            });
        })
      );
    })
  );
});

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

self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if available, else fetch from network
      return cachedResponse || fetch(event.request);
    })
  );
});
