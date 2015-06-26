/**
 * Created by xuxle on 2015/6/26.
 */
define(['ionic'], function () {
    angular.module('WorkStation.controllers', [])
        .controller('AppCtrl', ['$scope', '$ionicHistory', '$state', function ($scope, $ionicHistory, $state) {
            $scope.appModel = {
                tabsVisible: false
            };
            $scope.go = function (state) {
                $ionicHistory.nextViewOptions({
                    historyRoot: true,
                    disableAnimate: false,
                    expire: 300
                });
                $state.go(state);
            };

            $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                var url = toState.url;
                if (url.indexOf('demos') != -1 || url.indexOf('about') != -1) {
                    $scope.appModel.tabsVisible = false;
                } else {
                    $scope.appModel.tabsVisible = true;
                }
            });
        }])

        .controller('DemosCtrl', ['$scope', '$state', 'routeResolver', function ($scope, $state, routeResolver) {
            $scope.techData = [{
                id: 'ionic',
                name: 'ionic',
                logo: 'img/ionic.png'
            }, {
                id: 'ngCordova',
                name: 'ngCordova',
                logo: 'img/ngCordova.png'
            }];

            $scope.goApp = function (appId) {
                routeResolver.load(appId).then(function () {
                    $state.go('app.' + appId);
                });
                //$state.go('app.' + appId);
            };
        }]);
});