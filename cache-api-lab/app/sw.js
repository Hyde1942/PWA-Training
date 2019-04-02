const filesToCache = [
	'/',
	'style/main.css',
	'images/still_life_medium.jpg',
	'index.html',
	'pages/offline.html',
	'pages/404.html'
]


const staticCacheName = 'pages-cache-v1';

self.addEventListener('install', event => {
	console.log('Attemping to install service worker and cache static assets...');
	event.waitUntil(
		caches.open(staticCacheName)
		.then(cache => {
			return cache.addAll(filesToCache);
		})
	)
});


self.addEventListener('fetch', event => {
	console.log(`Fetching event for ${event.request.url}`);
	event.respondWith(
		caches.match(event.request)
		.then(response => {
			//TODO 4.
			if(response) {
				console.log(`Found, ${event.request.url} in cache`);
				return response;
			}
			console.log(`Network request for ${event.request.url}`);

			//TODO 5.
			return fetch(event.request)
			.then(response => {
			  if (response.status === 404) {
				return caches.match('pages/404.html')
			 }

			 return caches.open(staticCacheName)
			 .then(cache => {
			 	cache.put(event.requst.url, response.clone());
			 	return response;
			 })

			})
		}).catch(error => {
			console.log(`There was an error ${error}`);
			return caches.match('pages/offline.html')
		})
	)
})