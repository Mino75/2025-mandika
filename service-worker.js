// Generate a unique cache name based on the current timestamp 
const LIVE_CACHE = 'mandika-v2'; // Bump version when updating
const TEMP_CACHE = 'mandika-temp-v2';
const ASSETS  = [
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

// Install: Cache all assets in TEMP_CACHE
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(TEMP_CACHE)
      .then(cache => cache.addAll(ASSETS)) // Use addAll instead of fetching
      .catch(err => console.error('Install failed:', err))
  );
});

// Activate: Move assets from TEMP_CACHE to LIVE_CACHE
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      try {
        const tempCache = await caches.open(TEMP_CACHE);
        const liveCache = await caches.open(LIVE_CACHE);
        const requests = await tempCache.keys();

        // Copy assets from temp to live cache
        await Promise.all(
          requests.map(async request => {
            const response = await tempCache.match(request);
            if (response) await liveCache.put(request, response);
          })
        );

        await caches.delete(TEMP_CACHE);

        // Remove old cache versions
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(name => {
            if (name !== LIVE_CACHE) return caches.delete(name);
          })
        );

        // Claim clients (skip waiting)
        await self.clients.claim();
      } catch (err) {
        console.error('Activation failed:', err);
      }
    })()
  );
});

// Fetch: Try network first, fallback to cache
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return; // Ignore non-GET requests

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful network responses
        const responseClone = response.clone();
        caches.open(LIVE_CACHE).then(cache => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() => {
        // Fallback to cache on failure
        return caches.open(LIVE_CACHE).then(cache => cache.match(event.request))
          .then(cachedResponse => cachedResponse || new Response('Offline', { status: 503 }));
      })
  );
});
