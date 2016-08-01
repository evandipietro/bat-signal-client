'use strict';

window.addEventListener('load', () => {

    var reg;
    var sub;
    var isSubscribed = false;
    var subscribeButton = document.querySelector('.js-push-button');

    subscribeButton.addEventListener('click', () => {
        if (isSubscribed) {
            unsubscribe();
        } else {
            subscribe();
        }
    });

    if ('serviceWorker' in navigator) { //check compatability
        navigator.serviceWorker
            .register('sw.js')
            .then(init);
    }

    function init(registration) {
        console.log('Service worker registered!', registration);
        reg = registration;
        registration.pushManager.getSubscription()
            .then((subscription) => {
                subscribeButton.disabled = false;
                if (!subscription) {
                    return;
                }
            });
    }

    function subscribe() {
        reg.pushManager.subscribe({ userVisibleOnly: true }).
        then(function(pushSubscription) {
            sub = pushSubscription;
            console.log('Subscribed! Endpoint:', sub.endpoint);
            subscribeButton.textContent = 'Unsubscribe';
            isSubscribed = true;
        });
    }

    function unsubscribe() {
        reg.unsubscribe().then(function(event) {
            subscribeButton.textContent = 'Subscribe';
            console.log('Unsubscribed!', event);
            isSubscribed = false;
        }).catch(function(error) {
            console.log('Error unsubscribing', error);
            subscribeButton.textContent = 'Subscribe';
        });
    }
});
