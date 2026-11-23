/* Valenza Travel guest card - service worker (CLEO 2026-11-22). Network first, so updates show at once;
   the cached page only answers when the phone is offline. Lets Chrome on Android offer one-tap install. */
const C = "vt-guest-v1";
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(["./", "../logo.png", "../photo-round.jpg", "../icon-192.png"])).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => { if (e.request.mode === "navigate") { e.respondWith(fetch(e.request).catch(() => caches.match("./"))); } });
