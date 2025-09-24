const CACHE_NAME = 'acp-checklists-cache-v7'; // Version incrémentée pour invalider l'ancien cache

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Force le service worker en attente à devenir le service worker actif.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  // Supprime les anciens caches et prend le contrôle des clients immédiatement
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Nous ne mettons en cache que les requêtes GET.
  if (event.request.method !== 'GET') {
    return;
  }

  // Stratégie "réseau d'abord" pour le manifest.json pour garantir qu'il soit toujours à jour.
  if (event.request.url.includes('manifest.json')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        console.log('Manifest non accessible en réseau, tentative depuis le cache.');
        return caches.match(event.request);
      })
    );
    return;
  }
  
  // Stratégie "cache d'abord" pour toutes les autres ressources pour la performance.
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
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
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