/* ===========================================================
   Field Journal — sw.js (Service Worker)
   Hand-written, no Workbox or other libraries.

   Week 1 strategy:
     - Pre-cache the "app shell" (the files needed to show the UI).
     - Serve static assets cache-first so the app opens instantly
       and keeps working with no internet connection.

   The caching strategy is explained in the README.
   =========================================================== */

'use strict';

// Bump this version whenever the cached files change, so old
// caches are cleaned up on the next activation.
var CACHE_NAME = 'field-journal-v1';

// The app shell: everything required to render the interface offline.
var APP_SHELL = [
  './',
  './index.html',
  './css/styles.css',
  './js/app.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

// INSTALL: pre-cache the app shell.
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(APP_SHELL);
    })
  );
  // Activate the new service worker immediately.
  self.skipWaiting();
});

// ACTIVATE: remove caches from older versions.
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH: cache-first for our own static assets.
// If the asset is in the cache we return it instantly; otherwise we
// fetch from the network and store a copy for next time.
self.addEventListener('fetch', function (event) {
  // Only handle GET requests.
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;

      return fetch(event.request).then(function (response) {
        // Save a copy of same-origin responses for future offline use.
        if (response && response.status === 200 && response.type === 'basic') {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, copy);
          });
        }
        return response;
      }).catch(function () {
        // Offline and not cached: fall back to the app shell so
        // navigations still show the interface.
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
