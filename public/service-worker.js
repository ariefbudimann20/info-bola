importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  workbox.core.setCacheNameDetails({
    prefix : 'info-Bola'
  })
  console.log(`Workbox berhasil dimuat`);

}else{
  console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
  { url: '/', revision: '1'},
  { url: '/manifest.json', revision: '1'},
  { url: '/icon.png', revision: '1'},
  { url: '/favicon.ico', revision: '1'},
  { url: '/nav.html', revision: '1'},
  { url: '/index.html', revision: '1'},
  { url: '/detail-team.html', revision: '1'},
  { url: '/pages/home.html', revision: '1'},
  { url: '/pages/klasmen.html', revision: '1'},
  { url: '/pages/favorite.html', revision: '1'},
  { url: '/css/style.css', revision: '1'},
  { url: '/css/materialize.min.css', revision: '1'},
  { url: '/css/source/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1'},
  { url: '/css/source/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2', revision: '1'},
  { url: '/js/jquery.min.js', revision: '1'},
  { url: '/js/materialize.min.js', revision: '1'},
  { url: '/js/nav.js', revision: '1'},
  { url: '/js/api.js', revision: '1'},
  { url: '/js/db.js', revision: '1'},
  { url: '/js/idb.js', revision: '1'},
  { url: '/push.js', revision: '1'},
  { url: '/node_modules/sweetalert2/dist/sweetalert2.all.min.js', revision: '1'},
  { url: '/images/background.jpg', revision: '1'},
  { url: '/images/favicon.ico', revision: '1'},
  { url: '/images/logo_36x36.png', revision: '1'},
  { url: '/images/logo_48x48.png', revision: '1'},
  { url: '/images/logo_72x72.png', revision: '1'},
  { url: '/images/logo_96x96.png', revision: '1'},
  { url: '/images/logo_144x144.png', revision: '1'},
  { url: '/images/logo_192x192.png', revision: '1'},
  { url: '/images/logo_512x512.png', revision: '1'},
],{
    ignoreUrlParametersMatching: [/.*/]
  });

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'info-Bola-api'
  })
);

workbox.routing.registerRoute(
  new RegExp('https://crests.football-data.org/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'info-Bola-image'
  })
);

self.addEventListener('push', event => {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: '/images/logo_192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Info Bola', options)
  );
});