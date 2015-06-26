/**
 * Created by xuxle on 2015/6/26.
 */
define(['ionic'], function () {
    angular.module('WorkStation.utility', [])
        .provider('routeResolver', function () {
            var baseDirectory = 'apps/';

            this.setBaseDirectory = function (baseDir) {
                baseDirectory = baseDir;
            };

            this.$get = ['$rootScope','$q', function ($rootScope, $q) {
                return {
                    resolve: resolve,
                    load: load
                };

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
                        loadCSS(jsDir + '/css/main.css');
                        defer.resolve();
                        //$rootScope.$apply();
                    });

                    return defer.promise;
                }

                function loadCSS (path) {
                    if (checkCSSLoaded(path)) {
                        return;
                    }
                    var head = document.getElementsByTagName('head')[0];
                    var link = document.createElement('link');
                    link.href = path;
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    head.appendChild(link);
                }
                function checkCSSLoaded (path) {
                    var loadedCSS = csss(),
                        len = loadedCSS.length;
                    for (var i = 0; i < len; i++) {
                        if (loadedCSS[i].href.indexOf(path) != -1) {
                            return true;
                        }
                    }
                    return false;
                }
                function csss() {
                    return document.getElementsByTagName('link');
                }
            }];
        });
});