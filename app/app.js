'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.viewProducts',
    'myApp.viewProduct',
    'myApp.version',
    'ui.bootstrap'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .otherwise({redirectTo: '/view1'});
    }])
    .controller('globalController', function ($scope, $modal, $log, Auth) {
        $scope.open = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'loginModal.html',
                controller: 'loginModalController',
                size: size
            });

            modalInstance.result.then(function (user) {
                $scope.user = user;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.user = Auth.isLoggedIn();
    })
    .controller('loginModalController', function ($scope, $modalInstance, $http, $log, Auth) {
        $scope.errorMessage = "";
        $scope.activeForm = "login";

        $scope.ok = function () {
            $("#modalSubmitButton").blur();

            Auth.login($scope.user,
                function (data) {
                    $modalInstance.close(data);
                },
                function (error) {
                    $scope.errorMessage = error.message;
                });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .factory("Auth", function ($http, $log) {
        var user = {};

        return {
            isLoggedIn: function () {
                return user;
            },
            register: function (user, success, error) {
                $http.post('/register', user).success(function (res) {
                    user = res;
                    success();
                }).error(error);
            },
            login: function (user, success, error) {
                $http.get('login.json', user).success(function (res) {
                    if (res.error)
                        error(res.error);
                    else {
                        user = res;
                        success(user);
                    }
                }).error(error);
            },
            logout: function (success, error) {
                $http.post('/logout').success(function () {
                    user = {};
                    success();
                }).error(error);
            }
        };
    });