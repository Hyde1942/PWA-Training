self.addEventListener('install', (event) => {
	console.log('Service Worker is installing ...', event)
	// Add a Call to skipWaiting here.
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	console.log('Service worker is activating...',event);
});

self.addEventListener('fetch', (event) => {
	console.log('Fetching:', event.request.url);
});