'use strict';

define(['ionic'], function () {

    var routeResolver = function () {

        this.$get = function () {
            return this;
        };

        this.routeConfig = function () {
            var baseDirectory = 'apps/',

                setBaseDirectories = function (baseDir) {
                    baseDirectory = baseDir;
                },

                getBaseDirectory = function () {
                    return baseDirectory;
                };

            return {
                setBaseDirectories: setBaseDirectories,
                getBaseDirectory: getBaseDirectory
            };
        } ();

        this.route = function (routeConfig) {

            var resolve = function (appName, homeHtml, homeCtrl, controllerAs, secure) {
                var routeDef = {},
                    baseDirectory = routeConfig.getBaseDirectory();
                //routeDef.templateUrl = baseDirectory + appName + 'tpls/home.html';
                routeDef.templateUrl = baseDirectory + appName + '/tpls/' + homeHtml;
                //routeDef.controller = 'HomeCtrl';
                if (homeCtrl) {
                    routeDef.controller = homeCtrl;
                }
                if (controllerAs) {
                    routeDef.controllerAs = controllerAs;
                }
                routeDef.secure = (secure) ? secure : false;
                routeDef.resolve = {
                    load: ['$q', '$rootScope', function ($q, $rootScope) {
                        var jsDir = baseDirectory + appName;
                        var dependencies = [
                            jsDir + '/js/controllers.js',
                            jsDir + '/js/directives.js',
                            jsDir + '/js/services.js',
                            jsDir + '/js/filters.js'
                        ];

                        var defer = $q.defer();

                        require(dependencies, function () {
                            defer.resolve();
                            //$rootScope.$apply();
                        });

                        return defer.promise;
                    }]
                };

                return routeDef;
            };

            return {
                resolve: resolve
            };
        } (this.routeConfig);

    };

    var servicesApp = angular.module('routeResolverServices', []);

    //Must be a provider since it will be injected into module.config()    
    servicesApp.provider('routeResolver', routeResolver);
});
