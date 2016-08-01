self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/bat-signal-client/baticon.png'
            ]);
        })
    );
});

self.addEventListener('activate', function(event) {

});

self.addEventListener('push', function(event) {
    console.log('Push message received', event);
    event.waitUntil(self.registration.showNotification('Batsignal', {
        body: 'This has been a test of the batsignal',
        icon: 'baticon.png'
    }));
});