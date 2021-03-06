// Install the service worker.
this.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('v1').then(function(cache) {
			// The cache will fail if any of these resources can't be saved.
			return cache.addAll([
				// Path is relative to the origin, not the app directory.
				'/',
				'/index.html',
				'/assets/css/styles.css',
				'/assets/fonts/MaterialIcons-Regular.woff2',
				'/assets/js/script.js',
				'/assets/icons/ic-face.png',
				'/assets/icons/ic-face-large.png',
				'/manifest.json'
			])
			.then(function() {
				console.log('Success! App is available offline!');
			})
		})
	);
});


// Define what happens when a resource is requested.
// For our app we do a Cache-first approach.
self.addEventListener('fetch', function(event) {
	event.respondWith(
	    // Try the cache.
	    caches.match(event.request)
    	.then(function(response) {
			// Fallback to network if resource not stored in cache.
			return response || fetch(event.request);
		})
  	);
});