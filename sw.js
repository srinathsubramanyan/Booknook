// Booknook service worker: keeps the app shell available offline.
// Club data is never cached here; it comes live from Firebase.
var CACHE = 'booknook-v1';
var SHELL = ['./', 'index.html', 'config.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin) return;
  // Network first so updates to the site show up straight away; cache is the offline fallback.
  e.respondWith(fetch(r).then(function (res) {
    var copy = res.clone();
    caches.open(CACHE).then(function (c) { c.put(r, copy); });
    return res;
  }).catch(function () {
    return caches.match(r).then(function (m) { return m || caches.match('./'); });
  }));
});
