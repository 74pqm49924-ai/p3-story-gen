// P3 Story Gen - Service Worker
const CACHE_VERSION = "p3-story-v9-1";
const CACHE_FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

// Install : pre-cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(CACHE_FILES))
      .then(() => self.skipWaiting())
  );
});

// Activate : clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// Fetch : strategie cache-first pour les assets, network-first pour le HTML
self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // Ignorer les requêtes non-GET
  if (event.request.method !== "GET") return;

  // Pour le HTML : essayer network puis cache
  if (event.request.destination === "document") {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const cloned = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(event.request, cloned));
          return response;
        })
        .catch(() => caches.match(event.request).then(r => r || caches.match("./index.html")))
    );
    return;
  }

  // Pour les autres assets : cache puis network
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cacher les CDN aussi (fonts, libs)
        if (response.ok && (url.includes("cdnjs.cloudflare") || url.includes("fonts.googleapis") || url.includes("fonts.gstatic"))) {
          const cloned = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(event.request, cloned));
        }
        return response;
      }).catch(() => {
        // Fallback offline
        return new Response("Hors ligne", { status: 503, statusText: "Offline" });
      });
    })
  );
});
