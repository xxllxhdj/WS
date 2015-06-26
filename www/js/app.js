define([
    'ionic',
    'ngCordova',

    'js/controllers',
    'js/services',
    'js/utility'
], function () {
    var app = angular.module('WorkStation', [
        'ionic',
        'ngCordova',

        'WorkStation.controllers',
        'WorkStation.services',
        'WorkStation.utility'
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
                    $state.go('app.demos');
                } else if (url.indexOf('goNgCordova') != -1) {
                    $cordovaInAppBrowser.close();
                    $state.go('app.ngCordova');
                } else if (url.indexOf('NULL') != -1) {
                    $cordovaInAppBrowser.close();
                }
            });

            function onHardwareBackButton(e) {
                //if ($location.path().indexOf('/app/') != -1) {
                if ($location.path().indexOf('demos') != -1 || $location.path().indexOf('about') != -1) {
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
                    $ionicHistory.nextViewOptions({
                        historyRoot: true,
                        disableAnimate: false,
                        expire: 300
                    });
                    $state.go('app.demos');
                }

                e.preventDefault();
                return false;
            }
        }])

        .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
            function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
                app.register = {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    filter: $filterProvider.register,
                    factory: $provide.factory,
                    service: $provide.service,
                    state: $stateProvider.state
                };

                $stateProvider
                    .state('app', {
                        url: "/app",
                        abstract: true,
                        templateUrl: "tpls/app.html",
                        controller: 'AppCtrl'
                    })
                    .state('app.demos', {
                        url: "/demos",
                        views: {
                            'menuContent': {
                                templateUrl: "tpls/demos.html",
                                controller: 'DemosCtrl'
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
                    });
                $urlRouterProvider.otherwise('/app/demos');

                $ionicConfigProvider.platform.android.navBar.alignTitle('center');
                $ionicConfigProvider.platform.android.backButton.previousTitleText(false);
                $ionicConfigProvider.platform.android.navBar.transition('view');
                $ionicConfigProvider.platform.android.views.transition('ios');
                $ionicConfigProvider.platform.default.views.swipeBackEnabled(true);
                $ionicConfigProvider.platform.default.views.swipeBackHitWidth(45);
                $ionicConfigProvider.platform.android.tabs.style('standard');
                $ionicConfigProvider.platform.android.tabs.position('bottom');

                $ionicConfigProvider.platform.default.backButton.previousTitleText(false);
                $ionicConfigProvider.platform.default.backButton.text(false);
            }
        ]);

    return app;
});