if(!self.define){let s,e={};const c=(c,n)=>(c=new URL(c+".js",n).href,e[c]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=c,s.onload=e,document.head.appendChild(s)}else s=c,importScripts(c),e()})).then((()=>{let s=e[c];if(!s)throw new Error(`Module ${c} didn’t register its module`);return s})));self.define=(n,a)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let t={};const r=s=>c(s,i),o={module:{uri:i},exports:t,require:r};e[i]=Promise.all(n.map((s=>o[s]||r(s)))).then((s=>(a(...s),t)))}}define(["./workbox-f1770938"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/static/chunks/173-ab46f29db78513e6.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/203.215f7ebb412294c3.js",revision:"215f7ebb412294c3"},{url:"/_next/static/chunks/218.ee5bb437b51df9be.js",revision:"ee5bb437b51df9be"},{url:"/_next/static/chunks/455-8a671688d288801d.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/469-0e927fba7c37e7fc.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/4bd1b696-6bb6b35fad46dd11.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/527-eeb19690daf01fab.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/5e22fd23-a4d81f04bbfb9c70.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/612-3c35b0142a10e819.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/645-5bffc7479a38f38c.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/657-be5fef2ec70015d5.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/711-ecf609cd13e07caa.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/787-56ef43e43e563541.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/795d4814-79ae9d18148e2619.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/94730671-edcad388c8554ec9.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/9c4e2130-3df671e59c60edd1.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/(policy)/privacy-policy/page-37abf86241d7bbae.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/(policy)/terms-of-service/page-eca84fa3bb425ce9.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/_not-found/page-cf8f286dd1ade63a.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/api/adsense/payments/route-6434a09d51e4f5e6.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/api/adsense/reports/route-6960647073fdd1a6.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-cb3e83b9180351dc.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/api/notification/reports/%5BreportId%5D/route-319be653c262786e.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/api/notification/reports/route-78968f3883b454c0.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/api/notification/schedules/route-346e4a6dd2dff82d.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/api/notification/tasks/%5BreportId%5D/immediate-notification/route-31a0e139f753e355.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/api/notification/tasks/%5BreportId%5D/route-a9c446f58d3919c4.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/auth/signin/page-f3f29c790008c697.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/dashboard/analytics/page-e3ed2dd13ca31f1b.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/dashboard/exchange-rate/page-881486b5dfe9a3d9.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/dashboard/loading-42fd085baf787c29.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/dashboard/notification-settings/page-adff19e24c107cf4.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/dashboard/page-14ae1449ea8568db.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/error-18448b11b4111257.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/layout-b43659193602e16f.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/loading-26039a5b5b41b741.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/not-found-d63f449ae33105a9.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/app/page-848733129a487c35.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/c15bf2b0-f987a96bf025b29d.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/e34aaff9-3abacbe211fdf2f3.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/eec3d76d-6a2ad8cf2a549bbc.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/f97e080b-b14a329fc0dedd23.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/framework-895c1583be5f925a.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/main-28ac29a1409adb26.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/main-app-60fc489567c37276.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/pages/_app-66de6c865428b55f.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/pages/_error-c74051872fda1c25.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-411801e7dff4f542.js",revision:"xcsEPSN0l9dKycsTPpORL"},{url:"/_next/static/css/549c009f510480a0.css",revision:"549c009f510480a0"},{url:"/_next/static/css/7e12f5082d51b610.css",revision:"7e12f5082d51b610"},{url:"/_next/static/media/ff840cfebfb63b0c-s.p.woff2",revision:"302ec55f5b4320354ec6b35a53dead87"},{url:"/_next/static/xcsEPSN0l9dKycsTPpORL/_buildManifest.js",revision:"fce00e22572539b1d638aa70cf3b1162"},{url:"/_next/static/xcsEPSN0l9dKycsTPpORL/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/icons/android-launchericon-192-192.png",revision:"f5a570d2a9fe75ef8ca46fd29b113a20"},{url:"/icons/android-launchericon-384-384.png",revision:"1fd03d7f8dcf8a28e5647976a926a35e"},{url:"/icons/android-launchericon-48-48.png",revision:"4b0ad1f51026c3c4981cac0baffb72ec"},{url:"/icons/android-launchericon-512-512.png",revision:"9b0629186275cdde9ab60838ce302340"},{url:"/icons/profile.png",revision:"7c9102286acf27c0ff130c08dc58d455"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:s})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),s.registerRoute(/\/_next\/static.+\.js$/i,new s.CacheFirst({cacheName:"next-static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4|webm)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({sameOrigin:s,url:{pathname:e}})=>!(!s||e.startsWith("/api/auth/callback")||!e.startsWith("/api/"))),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({request:s,url:{pathname:e},sameOrigin:c})=>"1"===s.headers.get("RSC")&&"1"===s.headers.get("Next-Router-Prefetch")&&c&&!e.startsWith("/api/")),new s.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({request:s,url:{pathname:e},sameOrigin:c})=>"1"===s.headers.get("RSC")&&c&&!e.startsWith("/api/")),new s.NetworkFirst({cacheName:"pages-rsc",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:{pathname:s},sameOrigin:e})=>e&&!s.startsWith("/api/")),new s.NetworkFirst({cacheName:"pages",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({sameOrigin:s})=>!s),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
