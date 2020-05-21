importScripts('js/workbox.js');

self.addEventListener('push', function(event) {
	let title = "Bolibal : Aplikasi Sepakbola";
	let body;

	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message tanpa payload';
	}

	let options = {
		body: body,
		badge: '/img/icon-192.png',
		icon: '/img/icon-192.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};

	event.waitUntil(
		self.registration.showNotification(title, options)
	);
});

 
if(workbox)
{
	console.log("workbox berhasil dimuat")
	workbox.precaching.precacheAndRoute([
		{url: "/", revision: "1"},
		{url: "/index.html", revision: "1"},
		{url: "/manifest.json", revision: "1"},
		{url: "/nav.html", revision: "1"},
		{url: "/push.js", revision: "1"},
		{url: "/sw.js", revision: "1"},
		{url: "/css/materialize.min.css", revision: "1"},
		{url: "/css/style.css", revision: "1"},
		{url: "/js/component/navbar.js", revision: "1"},
		{url: "/js/api.js", revision: "1"},
		{url: "/js/db.js", revision: "1"},
		{url: "/js/fcm.js", revision: "1"},
		{url: "/js/idb.js", revision: "1"},
		{url: "/js/main.js", revision: "1"},
		{url: "/js/materialize.min.js", revision: "1"},
		{url: "/js/nav.js", revision: "1"},
		{url: "/js/push-notif.js", revision: "1"},
		{url: "/js/workbox.js", revision: "1"},
		{url: "/js/idb.js", revision: "1"},
		{url: "/pages/home.html", revision: "1"},
	])

	workbox.routing.registerRoute(
  		/\.(?:png|gif|jpg|jpeg|svg)$/,
  		workbox.strategies.cacheFirst({
			cacheName: "cache-img",
			plugins: [
				new workbox.cacheableResponse.Plugin({
					statuses: [0, 200]
				}),
				new workbox.expiration.Plugin({
					maxEntries: 200,
					maxAgeSeconds: 30 * 24 * 60 * 60
				}),
			]
		})
	);

	workbox.routing.registerRoute(
		new RegExp("https://api.football-data.org/v2/"),
		workbox.strategies.staleWhileRevalidate({
			cacheName: "api-cache",
			plugins: [
				new workbox.cacheableResponse.Plugin({
					statuses: [0, 200]
				}),
				new workbox.expiration.Plugin({
					maxEntries: 200,
					maxAgeSeconds: 30 * 24 * 60 * 60,
				}),
			]
		})
	);
}