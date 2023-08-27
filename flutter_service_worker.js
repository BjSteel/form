'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "cd443648cd8831aea42a35f8d2a97957",
"assets/AssetManifest.json": "45a7fb0fe49c0579ed37469aa48fce71",
"assets/assets/images/nassco-logo.png": "a230999f169dea704baa7a39eeeea2c5",
"assets/FontManifest.json": "535f15d5ee3029ad18f23a9a1ce25fdb",
"assets/fonts/MaterialIcons-Regular.otf": "041e13875b1d0a835bd0a88c73bc9991",
"assets/NOTICES": "9c33572e789a067c7baf4abbdc51c6b8",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/dropdown_button2/assets/fonts/Roboto-Regular.ttf": "8a36205bd9b83e03af0591a004bc97f4",
"assets/packages/quickalert/assets/confirm.gif": "bdc3e511c73e97fbc5cfb0c2b5f78e00",
"assets/packages/quickalert/assets/error.gif": "c307db003cf53e131f1c704bb16fb9bf",
"assets/packages/quickalert/assets/info.gif": "90d7fface6e2d52554f8614a1f5deb6b",
"assets/packages/quickalert/assets/loading.gif": "ac70f280e4a1b90065fe981eafe8ae13",
"assets/packages/quickalert/assets/success.gif": "dcede9f3064fe66b69f7bbe7b6e3849f",
"assets/packages/quickalert/assets/warning.gif": "f45dfa3b5857b812e0c8227211635cc4",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/67a8942a6396e2bc0f026334230fe457.ico.zip": "3cae16f1afbaa045ca822097b1f9b027",
"icons/android-icon-144x144.png": "c33f13a8810c53f3649e6b9e5f36651f",
"icons/android-icon-192x192.png": "523137e1712e22b5076c00f51ed39b32",
"icons/android-icon-36x36.png": "0acb891e6fd7941b3a807f91e45d7d3f",
"icons/android-icon-48x48.png": "33bf3814e315a2c008aec82284bebe80",
"icons/android-icon-72x72.png": "6dbe11b352f63852f598934b873a9470",
"icons/android-icon-96x96.png": "0719f200184a8a075abfbc42303899e6",
"icons/apple-icon-114x114.png": "2a72129f967e3febef2d1beb6fa66fd3",
"icons/apple-icon-120x120.png": "629694374863cd6d2a92d977cd79ac2b",
"icons/apple-icon-144x144.png": "c33f13a8810c53f3649e6b9e5f36651f",
"icons/apple-icon-152x152.png": "8be4f35ee600576bdfd931cc615be63f",
"icons/apple-icon-180x180.png": "8f7f077962f7386c72c9e53fedd59c96",
"icons/apple-icon-57x57.png": "53f98f7656c46b65ccba9eefa2cdb845",
"icons/apple-icon-60x60.png": "bf26d240c71b1422b696f1c335fdf3b2",
"icons/apple-icon-72x72.png": "6dbe11b352f63852f598934b873a9470",
"icons/apple-icon-76x76.png": "4d7ad90f0ed3ba34b5444835d7997f88",
"icons/apple-icon-precomposed.png": "ead2f95b096d22cc91dd6913e36825dc",
"icons/apple-icon.png": "ead2f95b096d22cc91dd6913e36825dc",
"icons/browserconfig.xml": "653d077300a12f09a69caeea7a8947f8",
"icons/favicon-16x16.png": "215df4604e15922cd7cbb561d36aec59",
"icons/favicon-32x32.png": "555a09dfa2aaf9c3f1a0f346de316b02",
"icons/favicon-96x96.png": "6f54f364f54c5de72713f32f48a9ae4e",
"icons/favicon.ico": "eaa7e1481f4a18de5daf2d31e832497a",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/manifest.json": "b58fcfa7628c9205cb11a1b2c3e8f99a",
"icons/ms-icon-144x144.png": "c33f13a8810c53f3649e6b9e5f36651f",
"icons/ms-icon-150x150.png": "a6331b179e6454328094b53ac4a68bb3",
"icons/ms-icon-310x310.png": "50d6d99c1d1fbe670048fb3eefe46c4c",
"icons/ms-icon-70x70.png": "ad14222902c3a368116455a0d49f2bfd",
"index.html": "2b0bfec512e39751b4163b32426b4b3c",
"/": "2b0bfec512e39751b4163b32426b4b3c",
"main.dart.js": "b3f5e3e79e121d7bd8ea6aba3e32e14b",
"main.dart.js_1.part.js": "13f93fb750f5c90bfe002bcc30b96f70",
"manifest.json": "dd4bc939fe2c7d1e91b2d5f06c558aac",
"version.json": "3420613b5b7bbf6236fbe64d71a545fd"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
