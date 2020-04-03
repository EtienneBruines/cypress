// So we don't need to reload the page for the service-worker to become active
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('fetch', event => {
  if (event.request.url.endsWith('ping')) {
    return event.respondWith(new Response('pong'))
  }

  return event.respondWith(
    fetch(event.request)
  )
})
