define([
    'ionic',
    'ngCordova',

    'routeResolver',
    'js/constants'
], function () {
    var app = angular.module('WorkStation', [
        'ionic',
        'ngCordova',

        'routeResolverServices',
        'WorkStation.constants'
    ])

        .run(['$rootScope', '$ionicHistory', '$location', '$ionicPlatform', '$state', '$timeout', '$cordovaToast', '$cordovaInAppBrowser', 'APPCONSTANTS', function ($rootScope, $ionicHistory, $location, $ionicPlatform, $state, $timeout, $cordovaToast, $cordovaInAppBrowser, APPCONSTANTS) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
                if (navigator.splashscreen) {
                    $timeout(function () {
                        navigator.splashscreen.hide();
                    }, APPCONSTANTS.SPLASH_SCREEN_EXTRA_DELAY);
                }
            });

            $ionicPlatform.registerBackButtonAction(
                onHardwareBackButton,
                APPCONSTANTS.PLATFORM_BACK_BUTTON_PRIORITY_VIEW
            );

            $rootScope.confirmExit = false;
            //$rootScope.$on("$cordovaInAppBrowser:exit", function (event, result) {
            //    alert(result.type + ', ' + result.additional);
            //});
            $rootScope.$on("$cordovaInAppBrowser:loadstart", function (event, result) {
                var url = result.url;

                if (url.indexOf('goHome') != -1) {
                    $cordovaInAppBrowser.close();
                    $state.go('home');
                } else if (url.indexOf('goNgCordova') != -1) {
                    $cordovaInAppBrowser.close();
                    $state.go('ngCordova');
                } else if (url.indexOf('NULL') != -1) {
                    $cordovaInAppBrowser.close();
                }
            });

            function onHardwareBackButton(e) {
                //if ($location.path().indexOf('/app/') != -1) {
                if ($location.path().indexOf('/app/demo') != -1 || $location.path().indexOf('/app/about') != -1) {
                    if ($rootScope.confirmExit) {
                        ionic.Platform.exitApp();
                    } else {
                        $rootScope.confirmExit = true;
                        $cordovaToast.showShortBottom(APPCONSTANTS.EXIT_APP_CONFIRM_STR);
                        $timeout(function () {
                            $rootScope.confirmExit = false;
                        }, APPCONSTANTS.EXIT_APP_CONFIRM_TIME);
                    }
                } else if ($ionicHistory.backView()) {
                    $ionicHistory.goBack();
                } else {
                    $rootScope.confirmExit = true;
                    $cordovaToast.showShortBottom(APPCONSTANTS.EXIT_APP_CONFIRM_STR);
                    $timeout(function () {
                        $rootScope.confirmExit = false;
                    }, APPCONSTANTS.EXIT_APP_CONFIRM_TIME);
                }

                e.preventDefault();
                return false;
            }
        }])

        .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', 'routeResolverProvider',
            function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, routeResolverProvider) {
            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            var route = routeResolverProvider.route;
            $stateProvider
                .state('app', {
                    url: "/app",
                    abstract: true,
                    templateUrl: "tpls/app.html"
                })
                .state('app.demo', {
                    url: "/demo",
                    views: {
                        'menuContent': {
                            templateUrl: "tpls/demo.html",
                            controller: 'DemoCtrl'
                        }
                    }
                })
                .state('app.about', {
                    url: "/about",
                    views: {
                        'menuContent': {
                            templateUrl: "tpls/about.html"
                        }
                    }
                })
                .state('app.ngCordova', {
                    url: "/ngCordova",
                    views: {
                        'menuContent': route.resolve('ngCordova', 'ngCordova.html')
                    }
                });
            $urlRouterProvider.otherwise('/app/demo');

            $ionicConfigProvider.platform.android.navBar.alignTitle('center');
            $ionicConfigProvider.platform.android.backButton.previousTitleText(false);
            $ionicConfigProvider.platform.android.navBar.transition('ios');
        }])

        .controller('DemoCtrl', ['$scope', function ($scope) {
            $scope.techData = [{
                id: 'ionic',
                name: 'ionic',
                logo: 'img/ionic.png'
            }, {
                id: 'ngCordova',
                name: 'ngCordova',
                logo: 'img/ngCordova.png'
            }];
        }]);

    return app;
});