// Generate a unique cache name based on the current timestamp 
const CACHE_VERSION = new Date().getTime();
const CACHE_NAME = `offline-cache-${CACHE_VERSION}`;

const urlsToCache = [
  '/',
  '/index.html',
  '/style.js',
  '/main.js',
  '/tesseract.min.js',
  '/tessdata/eng.traineddata',
  '/tessdata/fra.traineddata',
  '/tessdata/spa.traineddata',
  '/tessdata/jpn.traineddata',
  '/tessdata/rus.traineddata',
  '/tessdata/chi_sim.traineddata',
  '/tessdata/chi_tra.traineddata',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

self.addEventListener('install', event => {
  // Immediately activate this SW
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      // Delete all caches that don't match the current CACHE_NAME.
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Claim clients so that the new SW is immediately in control.
      return self.clients.claim();
    }).then(() => {
      // Notify all clients to reload with the new cache.
      return self.clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage({ action: 'reload' }));
      });
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached response if available; otherwise, fetch from the network.
      return response || fetch(event.request);
    })
  );
});
