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

    app.register.controller('customPluginCtrl', ['$scope', 'extraInfoPlugin', function ($scope, extraInfoPlugin) {
        extraInfoPlugin.get().then(function (extraInfo) {
            $scope.extraInfo = extraInfo;
            $scope.error = false;
        }, function (err) {
            $scope.extraInfo = err;
            $scope.error = true;
        });
    }]);

    app.register.controller('inAppBrowserCtrl', ['$rootScope', '$scope', '$cordovaInAppBrowser', function ($rootScope, $scope, $cordovaInAppBrowser) {
        $scope.url = 'http://www.baidu.com';
        $scope.target = '_blank';

        $scope.openUrl = function () {
            var options = {
                location: "no"
            };
            $cordovaInAppBrowser.open($scope.url, $scope.target, options).then(function () {
                //$cordovaToast.showShortBottom("InAppBrowser opened http://ngcordova.com successfully");
            }, function (error) {
                //$cordovaToast.showShortBottom("Error: " + error);
            });
        };
    }]);

    app.register.controller('fileCtrl', function ($scope, $cordovaFile, APPCONSTANTS) {

        $scope.inputs = {
            checkDir: "test_directory",
            checkFile: "test_file.txt",
            createDirectory: "test_directory",
            createFile: "test_file.txt",
            removeDirectory: "test_directory",
            removeFile: "test_file.txt",
            removeRecursively: "test_directory/test_file.txt",
            writeText: "THIS TEXT IS WRITTEN TO THIS FILE",
            writeFile: "test_file.txt",
            writeExistingText: "Write this text to an existing file",
            writeExistingFile: "test_file.txt",
            readFile: "test_file.txt",
            moveDirectory: "test_directory",
            moveFile: "test_file.txt",
            copyDirectory: "test_directory",
            copyFile: "test_file.txt"
        };

        $cordovaFile.createDir(cordova.file.externalRootDirectory, APPCONSTANTS.APP_NAME, false);
        var fileDir = cordova.file.externalRootDirectory + APPCONSTANTS.APP_NAME + '/';

        $scope.test = function () {
            if (window.cordova && window.cordova.file) {
                alert(JSON.stringify(cordova.file));
            } else {
                alert('没有cordova.file');
            }
        };

        $scope.checkDir = function () {
            // path, directory
            $cordovaFile.checkDir(fileDir, $scope.inputs.checkDir).then(function (success) {
                $scope.checkDirResult = 'success ' + JSON.stringify(success);
            }, function (error) {
                $scope.checkDirResult = 'error ' + JSON.stringify(error);
            });
        };

        $scope.checkFile = function () {
            // path, file
            $cordovaFile.checkFile(fileDir, $scope.inputs.checkFile).then(function (success) {
                $scope.checkFileResult = 'success ' + JSON.stringify(success);
            }, function (error) {
                $scope.checkFileResult = 'error ' + JSON.stringify(error);
            });
        };

        $scope.createDirectory = function () {
            // path, dirName, replace?
            $cordovaFile.createDir(fileDir, $scope.inputs.createDirectory, false).then(function (success) {
                $scope.createDirectoryResult = 'success ' + JSON.stringify(success);
            }, function (error) {
                $scope.createDirectoryResult = 'error ' + JSON.stringify(error);
            });
        };

        $scope.createFile = function () {
            // path, fileName, replace?
            $cordovaFile.createFile(fileDir, $scope.inputs.createFile, true).then(function (success) {
                $scope.createFileResult = 'success ' + JSON.stringify(success);
            }, function (error) {
                $scope.createFileResult = 'error ' + JSON.stringify(error);
            });
        };


        $scope.removeFile = function () {
            // path, fileName
            $cordovaFile.removeFile(fileDir, $scope.inputs.removeFile).then(function (success) {
                $scope.removeFileResult = 'success ' + JSON.stringify(success);
            }, function (error) {
                $scope.removeFileResult = 'error ' + JSON.stringify(error);
            });
        };

        $scope.removeDirectory = function () {
            // path, dirName
            $cordovaFile.removeDir(fileDir, $scope.inputs.removeDirectory).then(function (success) {
                $scope.removeDirectoryResult = 'success ' + JSON.stringify(success);
            }, function (error) {
                $scope.removeDirectoryResult = 'error ' + JSON.stringify(error);
            });
        };


        $scope.removeRecursively = function () {
            // path, dirName
            $cordovaFile.removeRecursively(fileDir, $scope.inputs.removeDirectory).then(function (success) {
                $scope.removeRecursivelyResult = 'success ' + JSON.stringify(success);
            }, function (error) {
                $scope.removeRecursivelyResult = 'error ' + JSON.stringify(error);
            });
        };


        $scope.writeFile = function () {
            // path, fileName, text, replace?
            $cordovaFile.writeFile(fileDir, $scope.inputs.writeFile, $scope.inputs.writeText, true).then(function (success) {
                $scope.writeFileResult = 'success ' + JSON.stringify(success);
            }, function (error) {
                $scope.writeFileResult = 'error ' + JSON.stringify(error);
            });
        };


        $scope.writeExistingFile = function () {
            // path, fileName, text
            $cordovaFile.writeExistingFile(fileDir, $scope.inputs.writeExistingFile, $scope.inputs.writeExistingText).then(function (success) {
                $scope.writeExistingFileResult = 'success ' + JSON.stringify(success);
            }, function (error) {
                $scope.writeExistingFileResult = 'error ' + JSON.stringify(error);
            });
        };

        $scope.readFileAsText = function () {
            // path, fileName
            $cordovaFile.readAsText(fileDir, $scope.inputs.readFile).then(function (success) {
                $scope.readFileResult = 'success ' + JSON.stringify(success);
            }, function (error) {
                $scope.readFileResult = 'error ' + JSON.stringify(error);
            });
        };

        $scope.moveDir = function () {
            // path, DirName, newPath, newDirName
            $cordovaFile.moveDir(fileDir, $scope.inputs.moveDirectory, cordova.file.tempDirectory, "new_directory").then(function (success) {
                $scope.moveDirectoryResult = 'success ' + JSON.stringify(success);
            }, function (error) {
                $scope.moveDirectoryResult = 'error ' + JSON.stringify(error);
            });
        };

        $scope.moveFile = function () {
            // path, fileName, newPath, newFileName
            $cordovaFile.moveFile(fileDir, $scope.inputs.moveFile, cordova.file.tempDirectory, "new_file.txt").then(function (success) {
                $scope.moveFileResult = 'success ' + JSON.stringify(success);
            }, function (error) {
                $scope.moveFileResult = 'error ' + JSON.stringify(error);
            });
        };

        $scope.copyDir = function () {
            // path, dirName, newPath, dirFileName
            $cordovaFile.copyDir(fileDir, $scope.inputs.copyDirectory, cordova.file.tempDirectory, "new_directory").then(function (success) {
                $scope.copyDirectoryResult = 'success ' + JSON.stringify(success);
            }, function (error) {
                $scope.copyDirectoryResult = 'error ' + JSON.stringify(error);
            });
        };

        $scope.copyFile = function () {
            // path, fileName, newPath, newFileName
            $cordovaFile.copyFile(fileDir, $scope.inputs.copyFile, cordova.file.tempDirectory, "new_file.txt").then(function (success) {
                $scope.copyFileResult = 'success ' + JSON.stringify(success);
            }, function (error) {
                $scope.copyFileResult = 'error ' + JSON.stringify(error);
            });
        };
    });
});