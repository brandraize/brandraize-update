// Service worker for the /admin dashboard (registered with scope /admin by components/admin/useDesktopApp.ts).
// It shows new-request alerts sent by the website (lib/push.ts), even when the dashboard is closed.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'New consultation request', {
      body: data.body || '',
      tag: data.tag,
      data: { url: data.url || '/admin' },
      icon: '/admin-app/icon-192.png',
      badge: '/admin-app/badge.png',
      // A request should not slip by unseen: the alert stays until it is clicked or closed.
      requireInteraction: true,
    }),
  );
});

// Clicking an alert brings the dashboard forward, or opens it if it is closed.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = new URL(event.notification.data?.url || '/admin', self.location.origin).href;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windows) => {
      const open = windows.find((w) => new URL(w.url).pathname.startsWith('/admin'));
      return open ? open.focus() : self.clients.openWindow(url);
    }),
  );
});
