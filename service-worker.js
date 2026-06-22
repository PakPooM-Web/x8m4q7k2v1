const CACHE_NAME = "steam-library-v1";

const urlsToCache = [
    "./",
    "./index.html",
    "./steam-guard.html",
    "./css/style.css",
    "./js/script.js",
    "./data/games.json",
    "./images/steam-guard-guide.jpg",
    "./images/icon-192.png",
    "./images/icon-512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});