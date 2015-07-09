/**
 * Created by xuxle on 2015/6/19.
 */
define(['app', 'ngCordova'], function (app) {

    app.register.controller('ExpandCtrl', ['$scope', 'performanceService', function ($scope, performanceService) {
        $scope.data = {
            current: performanceService.getUserPerf(),
            performances: performanceService.getAllPerfs()
        };
    }]);

});