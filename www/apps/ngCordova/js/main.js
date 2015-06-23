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
    app.register.state('app.barcodeScanner', {
        url: "/barcodeScanner",
        views: {
            'menuContent': {
                templateUrl: "apps/ngCordova/tpls/barcodeScanner.html",
                controller: "BarcodeScannerCtrl"
            }
        }
    });
    app.register.state('app.customPlugins', {
        url: "/customPlugins",
        views: {
            'menuContent': {
                templateUrl: "apps/ngCordova/tpls/customPlugins.html",
                controller: "customPluginCtrl"
            }
        }
    });
    app.register.state('app.inAppBrowser', {
        url: "/inAppBrowser",
        views: {
            'menuContent': {
                templateUrl: "apps/ngCordova/tpls/inAppBrowser.html",
                controller: "inAppBrowserCtrl"
            }
        }
    });
});