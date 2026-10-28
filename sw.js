var CACHE="mitobrew-v3";
var FILES=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}));self.clients.claim()});
// Red primero (siempre la última versión); sin conexión usa la copia guardada
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request).then(function(n){var cp=n.clone();caches.open(CACHE).then(function(c){c.put(e.request,cp)});return n}).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match("./index.html")})}))});
