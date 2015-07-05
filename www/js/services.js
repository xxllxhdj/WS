/**
 * Created by xuxle on 2015/6/26.
 */
define(['ionic'], function () {
    angular.module('WorkStation.services', [])

        .constant('APPCONSTANTS', {
            APP_NAME: 'workstation',
            CONFIG_FILE_NAME: 'config.txt',

            SPLASH_SCREEN_EXTRA_DELAY: 1000,
            PLATFORM_BACK_BUTTON_PRIORITY_VIEW: 110,
            EXIT_APP_CONFIRM_TIME: 2000,

            EXIT_APP_CONFIRM_STR: '再按一次退出工作站'
        })

        .factory('utilService', ['APPCONSTANTS', function (APPCONSTANTS) {
            var o = {};

            o.getAppFileDir = function () {
                return cordova.file.externalRootDirectory || cordova.file.documentsDirectory;
            };
            o.getConfigDir = function () {
                return o.getAppFileDir() + '/' + APPCONSTANTS.APP_NAME + '/';
            };

            return o;
        }])

        .factory('configService', ['$q', '$log', '$cordovaFile', 'utilService', 'APPCONSTANTS', function ($q, $log, $cordovaFile, utilService, APPCONSTANTS) {
            var configDefer = $q.defer(),
                config = {},
                o = {
                    loadingPromise: configDefer.promise,
                    set: errorHandler,
                    get: errorHandler
                };

            o.loadingPromise.finally(function () {
                o.set = function (key, value) {
                    var defer = $q.defer();

                    config[key] = value;
                    writeConfigFile().then(function () {
                        defer.resolve();
                    }, function () {
                        defer.reject();
                    });

                    return defer.promise;
                };
                o.get = function (key, defaults) {
                    return config.hasOwnProperty(key) ? config[key] : (defaults || null);
                };
            });

            init();

            return o;

            function errorHandler (err){
                $log.error("Error", err);
            }
            function init () {
                if (window.cordova) {
                    initAppFileDir().then(function () {
                        readConfigFile().then(function (jsonData) {
                            angular.extend(config, jsonData);
                            configDefer.resolve();
                        }, function () {
                            configDefer.resolve();
                        });
                    }, function () {
                        configDefer.resolve();
                    });
                } else {
                    configDefer.resolve();
                }

            }
            function initAppFileDir () {
                var defer = $q.defer(),
                    appFileDir = utilService.getAppFileDir();
                $cordovaFile.checkDir(appFileDir, APPCONSTANTS.APP_NAME).then(function () {
                    defer.resolve();
                }, function () {
                    $cordovaFile.createDir(appFileDir, APPCONSTANTS.APP_NAME, false).finally(function () {
                        defer.resolve();
                    });
                });

                return defer.promise;
            }
            function readConfigFile () {
                var defer = $q.defer(),
                    configFileDir = utilService.getConfigDir();
                $cordovaFile.checkFile(configFileDir, APPCONSTANTS.CONFIG_FILE_NAME).then(function () {
                    $cordovaFile.readAsText(configFileDir, APPCONSTANTS.CONFIG_FILE_NAME).then(function (data) {
                        defer.resolve(angular.fromJson(data));
                    }, function () {
                        defer.resolve({});
                    });
                }, function () {
                    defer.resolve({});
                });

                return defer.promise;
            }
            function writeConfigFile () {
                var defer = $q.defer();

                if (window.cordova) {
                    $cordovaFile.writeFile(utilService.getConfigDir(), APPCONSTANTS.CONFIG_FILE_NAME, angular.toJson(config), true).then(function () {
                        defer.resolve();
                    }, function () {
                        defer.reject();
                    });
                } else {
                    defer.resolve();
                }

                return defer.promise;
            }
        }]);
});