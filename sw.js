const V='teacheros-v5';
const SHELL=['./','index.html','config.js','manifest.webmanifest','logo_new.webp','icon-192.png','icon-512.png'];
const LIBS=['https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js','https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js','https://cdn.jsdelivr.net/npm/html5-qrcode@2.3.8/html5-qrcode.min.js','https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js','https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(V);await Promise.all([...SHELL,...LIBS].map(u=>c.add(u).catch(()=>{})));self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==V)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.hostname.endsWith('supabase.co'))return;
  if(u.origin===location.origin){
    e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./'))));
  }else if(u.hostname==='cdn.jsdelivr.net'){
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})));
  }
});