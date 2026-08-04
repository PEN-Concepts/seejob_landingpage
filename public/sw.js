// Marketing-site service worker — its ONLY job is to make the site installable
// (Chrome requires a registered SW with a fetch handler before it will fire the
// beforeinstallprompt "Install" flow). It caches NOTHING: every request goes
// straight to the network, so the marketing pages never go stale. The installed
// app's start_url points at the SeeJobRun web app (/user-dashboard/m), which has
// its own separate, more-specific service worker.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (event) => {
  // Pass through untouched — a no-op fetch handler is enough to satisfy the
  // installability check without ever serving a cached (stale) response.
  event.respondWith(fetch(event.request));
});
