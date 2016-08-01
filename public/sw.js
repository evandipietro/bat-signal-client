self.addEventListener('install', function(event) {

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
