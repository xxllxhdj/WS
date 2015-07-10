/**
 * Created by XXL on 2015/6/20.
 */
define([
    'app',
    'apps/ionic/js/controllers',
    'apps/ionic/js/directives',
    'apps/ionic/js/services',
    'apps/ionic/js/filters'
], function (app) {
    app.register
        .state('app.ionic', {
            url: '/ionic',
            views: {
                'menuContent': {
                    templateUrl: 'apps/ionic/index.html'
                }
            }
        })
        .state('app.expander', {
            url: '/expander',
            views: {
                'menuContent': {
                    templateUrl: 'apps/ionic/tpls/expander.html',
                    controller: 'ExpandCtrl'
                }
            }
        })
        .state('app.scroll', {
            url: '/scroll',
            views: {
                'menuContent': {
                    templateUrl: 'apps/ionic/tpls/scroll.html'
                }
            }
        });
});