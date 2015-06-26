/**
 * Created by xuxle on 2015/6/26.
 */
define(['ionic'], function () {
    angular.module('WorkStation.services', [])

        .constant('APPCONSTANTS', {
            APP_NAME: 'workstation',
            SPLASH_SCREEN_EXTRA_DELAY: 1000,
            PLATFORM_BACK_BUTTON_PRIORITY_VIEW: 110,
            EXIT_APP_CONFIRM_TIME: 2000,

            EXIT_APP_CONFIRM_STR: '再按一次退出工作站'
        })

        .provider('routeResolver', function () {
            var baseDirectory = 'apps/';

            this.setBaseDirectory = function (baseDir) {
                baseDirectory = baseDir;
            };

            this.$get = ['$rootScope','$q', function ($rootScope, $q) {
                return {
                    resolve: resolve,
                    load: load
                }

                function resolve (appName, homeHtml, homeCtrl, controllerAs, secure) {
                    var routeDef = {};
                    routeDef.templateUrl = baseDirectory + appName + '/' + homeHtml;
                    if (homeCtrl) {
                        routeDef.controller = homeCtrl;
                    }
                    if (controllerAs) {
                        routeDef.controllerAs = controllerAs;
                    }
                    routeDef.secure = (secure) ? secure : false;
                    routeDef.resolve = {
                        load: function () {
                            var jsDir = baseDirectory + appName;
                            var dependencies = [
                                jsDir + '/js/main.js'
                            ];

                            var defer = $q.defer();

                            require(dependencies, function () {
                                defer.resolve();
                                //$rootScope.$apply();
                            });

                            return defer.promise;
                        }
                    };
                    return routeDef;
                }

                function load (appId) {
                    var defer = $q.defer();

                    var jsDir = baseDirectory + appId;
                    var dependencies = [
                        jsDir + '/js/main.js'
                    ];

                    require(dependencies, function () {
                        var head = document.getElementsByTagName('head')[0];
                        var link = document.createElement('link');
                        link.href = jsDir + '/css/main.css';
                        link.rel = 'stylesheet';
                        link.type = 'text/css';
                        head.appendChild(link);
                        defer.resolve();
                        //$rootScope.$apply();
                    });

                    return defer.promise;
                }
            }];
        });
});