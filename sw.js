const CACHE_NAME = 'acp-checklists-cache-v2';

const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'icon-192x192.png',
  'icon-512x512.png',
  'maskable_icon.png',
  'apple-touch-icon.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Nous ne mettons en cache que les requêtes GET.
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la réponse est dans le cache, on la retourne.
        if (response) {
          return response;
        }

        // Sinon, on fait une requête réseau.
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          networkResponse => {
            // On vérifie si la réponse est valide.
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }
            
            // On clone la réponse pour la mettre en cache et la retourner au navigateur.
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          }
        );
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
      ).then(() => self.clients.claim());
    })
  );
});