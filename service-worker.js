const CACHE_NAME = 'offline-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.js',
  '/app.js',
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

 
  
  // Add other assets you want to cache, e.g., CSS files, images, etc.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if available, else fetch from network.
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
