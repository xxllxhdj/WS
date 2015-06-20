/**
 * Created by xuxle on 2015/6/19.
 */
define(['app', 'ngCordova'], function (app) {

    app.register.controller('TestController', ['$scope', function ($scope) {
    }]);

    app.register.controller('BarcodeScannerCtrl', ['$scope', '$cordovaBarcodeScanner', function ($scope, $cordovaBarcodeScanner) {
        $scope.scan = function () {
            $cordovaBarcodeScanner
                .scan()
                .then(function (result) {
                    $scope.scanResult = result;
                }, function (err) {
                    $scope.scanResult = 'SCAN ERROR (see console)';
                    console.error(err);
                });
        };
    }]);

});