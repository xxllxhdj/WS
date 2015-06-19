
requirejs.config({
    baseUrl: '../www',
    paths: {
        app: 'js/app',
        ionic: 'lib/ionic/js/ionic.bundle',
        ngCordova: 'lib/ngCordova/dist/ng-cordova',
        domReady: 'lib/requirejs/domReady',
        routeResolver: 'js/routeResolver'
    },
    shim: {
        ngCordova: {
            deps: ['ionic']
        }
    }
});

// Start the main app logic.
requirejs(['app'], function () {

    var onDeviceReady = function () {
        angular.bootstrap(document, ['WorkStation']);
    };
    document.addEventListener("deviceready", onDeviceReady, false);
    if (typeof cordova === 'undefined') {
        require(['domReady!'], function (document) {
            onDeviceReady();
        });
    }
});
