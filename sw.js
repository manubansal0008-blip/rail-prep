// Rail Prep service worker: lets the site open like an app (installable, works offline for pages already visited).
// Pages and all data/ files (daily news changes without a version bump): network first, cached copy when offline.
// Versioned CSS/JS (?v=…) and icons: cache first.
// Book PDFs and other sites (chat worker) are never cached.
var CACHE = "railprep-v1";
var CORE = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin || /\/books\//.test(u.pathname) || /\.pdf$/i.test(u.pathname)) return;
  var scope = new URL(self.registration.scope).pathname;
  if (u.pathname.indexOf(scope) !== 0) return;
  // only code and icons are cache-first (their ?v= changes on every release); data/ (daily news, dates) stays network-first
  var rel = u.pathname.slice(scope.length);
  var versioned = (u.searchParams.has("v") && /^(css|js)\//.test(rel)) || /^icons\//.test(rel);
  if (versioned) {
    e.respondWith(caches.match(r).then(function (hit) {
      return hit || fetch(r).then(function (res) {
        if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(r, copy); }); }
        return res;
      });
    }));
    return;
  }
  e.respondWith(fetch(r).then(function (res) {
    if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(r, copy); }); }
    return res;
  }).catch(function () {
    return caches.match(r, { ignoreSearch: r.mode === "navigate" }).then(function (hit) {
      return hit || (r.mode === "navigate" ? caches.match("./index.html") : Response.error());
    });
  }));
});
self.addEventListener("message", function (e) {
  var list = e.data && e.data.keep; if (!list || !list.length) return;
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(list.slice(0, 80).map(function (u) {
      return c.match(u).then(function (hit) { return hit || c.add(u).catch(function () {}); });
    }));
  }));
});
