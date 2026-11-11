/* global self, caches, buildId, offlineUrls */
const cachePrefix = "shahin-menu-";
const cacheName = cachePrefix + buildId;
const offlinePaths = new Set(offlineUrls);

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(offlineUrls.map((url) => new Request(url, { cache: "reload" })));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter((name) => name.startsWith(cachePrefix) && name !== cacheName)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  const isHome = request.mode === "navigate" && url.pathname === "/";
  const key = isHome ? "/" : url.pathname;
  if (!offlinePaths.has(key) || (!isHome && (key === "/" || url.search))) return;

  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    return (await cache.match(key)) ?? fetch(request);
  })());
});
