/**
 * Created by XXL on 2015/6/20.
 */
define([
    'app',
    'apps/ngCordova/js/controllers',
    'apps/ngCordova/js/directives',
    'apps/ngCordova/js/services',
    'apps/ngCordova/js/filters'
], function (app) {
    app.register
        .state('app.ngCordova', {
            url: "/ngCordova",
            views: {
                'menuContent': {
                    templateUrl: "apps/ngCordova/index.html",
                    controller: 'CordovaController'
                }
            }
        })
        .state('app.barcodeScanner', {
            url: "/barcodeScanner",
            views: {
                'menuContent': {
                    templateUrl: "apps/ngCordova/tpls/barcodeScanner.html",
                    controller: "BarcodeScannerCtrl"
                }
            }
        })
        .state('app.customPlugins', {
            url: "/customPlugins",
            views: {
                'menuContent': {
                    templateUrl: "apps/ngCordova/tpls/customPlugins.html",
                    controller: "customPluginCtrl"
                }
            }
        })
        .state('app.inAppBrowser', {
            url: "/inAppBrowser",
            views: {
                'menuContent': {
                    templateUrl: "apps/ngCordova/tpls/inAppBrowser.html",
                    controller: "inAppBrowserCtrl"
                }
            }
        })
        .state('app.file', {
            url: "/file",
            views: {
                'menuContent': {
                    templateUrl: "apps/ngCordova/tpls/file.html",
                    controller: "fileCtrl"
                }
            }
        });
});