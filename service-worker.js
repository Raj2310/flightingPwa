var cacheName = 'flighting-4';
var filesToCache = [
/*'/',
'index.html',
'vue.js',
'vue-router.js',
'stylesearch.css',
'stylenotification.css',
'registration.html',
'reg.png',
'navbar.css',
'jquery.js',
'index.js',
'bootstrap.min.js',
'axios.js',
'fonts/glyphicons-halflings-regular.eot',
'fonts/glyphicons-halflings-regular.svg',
'fonts/glyphicons-halflings-regular.ttf',
'fonts/glyphicons-halflings-regular.woff',
'fonts/glyphicons-halflings-regular.woff2',
'css/bootstrap.min.css'*/

];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
    	if(response){
	console.log("response from inside",response)
    	}else{
    		console.log("unable to fetch from inside",e.request)	
    	}
    
      return response || fetch(e.request);
    })
  );
});

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: event.data.text(),
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});