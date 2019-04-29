// adapted from:
// https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker

// Create array of files to be cached by the service worker
const filesToCache = [
    '/',
    'index.html',
    'activities.html',
    'events.html',
    'walk.html',
    'news.html',
    'help.html',

    'bandstand.html',
    'brewdog.html',
    'cafe1.html',
    'fountain.html',
    'inndeep.html',
    'kmuseum.html',
    'skatepark.html',
    'tennis.html',
    'thestand.html',

    './src/js/app.js',
    '/src/js/colours.json',
    '/src/js/fetch.js',
    '/src/js/index.js',
    '/src/js/promise.js',

    '/src/images/fad/lawn.jpg',

    '/src/images/fad/an-clachan-cafe.jpg',
    '/src/images/fad/arrow.png',
    '/src/images/fad/bandstand.jpg',
    '/src/images/fad/brew.jpg',
    '/src/images/fad/brewdogmenu.png',
    '/src/images/fad/chaimenu.jpg',
    '/src/images/fad/chaimenu2.jpg',
    '/src/images/fad/chaiwallah.jpg',
    '/src/images/fad/clachanmenu.jpg',

    '/src/images/fad/cleanup.jpg',
    '/src/images/fad/cleanUp.png',
    '/src/images/fad/flower.jpg',
    '/src/images/fad/flowers - Copy.jpg',
    '/src/images/fad/indeep.jpg',
    '/src/images/fad/indeep2.jpg',
    '/src/images/fad/inndeep.jpg',
    '/src/images/fad/inndeepmenu.jpg',
    '/src/images/fad/menu.jpg',
    '/src/images/fad/menu.png',
    '/src/images/fad/menu.psd',
    '/src/images/fad/museum.jpg',

    '/src/images/fad/phone.png',
    '/src/images/fad/pigeon.jpg',
    '/src/images/fad/skatepark.jpg',
    '/src/images/fad/stand.jpg',
    '/src/images/fad/stewartfountain.jpg',
    '/src/images/fad/summerNights.jpg',
    '/src/images/fad/summersessions.jpg',
    '/src/images/fad/tour.jpg',
    '/src/images/fad/web.png',
    '/src/images/fad/Wfm_kelvingrove_park.jpg',

    '/src/images/index/bird.jpg',
    '/src/images/index/caro1.jpg',
    '/src/images/index/caro2.jpg',
    '/src/images/index/dali.jpg',
    '/src/images/index/dali2.jpg',
    '/src/images/index/dd.jpg',
    '/src/images/index/dogw.png',
    '/src/images/index/facilities.jpg',
    '/src/images/index/foot.png',
    '/src/images/index/foot2.png',
    '/src/images/index/fountain.jpg',
    '/src/images/index/heads.jpg',
    '/src/images/index/heads - Copy.jpg',
    '/src/images/index/history.jpg',
    '/src/images/index/kelvingroveicon.png',
    '/src/images/index/ladies.jpg',
    '/src/images/index/museumindoor.jpg',
    '/src/images/index/statue.jpg',
    '/src/images/index/todo.png',
    '/src/images/index/whatson.png',

    '/src/images/index/whatson.png',
    '/src/images/index/whatson.png',
    '/src/images/index/whatson.png',
    '/src/images/index/whatson.png',

    'order.js',
    'reservation.js',
    'search.js',
    'sw.js',
    'db.js',

    '/src/js/todo/todoDB.js',
    '/src/js/todo/todo.js',
];


// create the cache with caches.open and use the addAll method to add the files to the cache.
const staticCacheName = 'pages-cache';
self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    );
});


// Fetch listener will intercept all requests and check the cache fot the requested resource. If they are not present in the cache it will send the request on to the network
self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
                console.log('Network request for ', event.request.url);
                return fetch(event.request)

                    .then(response => {
                        return caches.open(staticCacheName).then(cache => {
                            cache.put(event.request.url, response.clone());
                            return response;
                        });
                    });


            }).catch(error => {

        })
    );
});

