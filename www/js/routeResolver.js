define(['ionic'], function () {
    
    angular.module('routeResolverServices', [])

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
                        defer.resolve();
                        //$rootScope.$apply();
                    });

                    return defer.promise;
                }
            }];
        });
});
