/* ---------------------------------------------------------------
   SERVICE WORKER — cachea el cascarón de la app para uso offline.
   El texto bíblico se cachea aparte, en localStorage (ver bible-api.js),
   porque se pide capítulo por capítulo bajo demanda.
--------------------------------------------------------------- */

const CACHE = "mi-senda-biblica-v1";
const ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/styles.css",
  "./js/icons.js",
  "./js/data.js",
  "./js/bible-api.js",
  "./js/state.js",
  "./js/views.js",
  "./js/app.js",
  "./icons/icon.svg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARCHIVOS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Nunca intervenir peticiones a la API de texto bíblico: siempre red.
  if (url.hostname !== location.hostname) return;

  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
