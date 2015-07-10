/**
 * Created by XXL on 2015/6/20.
 */
define([
    'app',
    'apps/bootstrap/js/controllers',
    'apps/bootstrap/js/directives',
    'apps/bootstrap/js/services',
    'apps/bootstrap/js/filters'
], function (app) {
    app.register
        .state('app.bootstrap', {
            url: '/bootstrap',
            views: {
                'menuContent': {
                    templateUrl: 'apps/bootstrap/index.html'
                }
            }
        })
        .state('app.datepicker', {
            url: '/datepicker',
            views: {
                'menuContent': {
                    templateUrl: 'apps/bootstrap/tpls/datepicker.html',
                    controller: 'datePickerCtrl'
                }
            }
        });
});