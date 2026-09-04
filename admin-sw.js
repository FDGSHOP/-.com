const CACHE_NAME='monny-admin-stable-4f-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith((async()=>{
    try{return await fetch(event.request,{cache:'no-store'});}
    catch(_){return (await caches.match(event.request)) || Response.error();}
  })());
});
