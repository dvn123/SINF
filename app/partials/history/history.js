'use strict';

angular.module('myApp.history', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/history', {
                controller: 'historyCtrl',
                templateUrl: 'partials/history/history.html'
            })
    }])
    .controller('historyCtrl', function ($http, $log, $scope, Auth) {
        $scope.orders = [];

        $http.get('partials/history/history.json').success(function (res) {
            $scope.orders = res;
        }).error(function (error) {
            $log.error(error);
        });
    })
    .controller('userProfileCtrl', function ($http, $scope, Auth, $log) {
        $scope.errorMessage = "";
        $scope.newuser = {};

        $scope.differentPasswords = function () {
            return $scope.newuser.password !== $scope.newuser.password2;
        };

        $scope.editUser = function () {
            $("#editFormSubmitButton").blur();

            Auth.edit($scope.newuser,
                function (data) {
                    $scope.newuser = {};
                },
                function (error) {
                    $scope.errorMessage = error.message;
                });
        }
    });