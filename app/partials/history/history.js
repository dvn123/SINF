'use strict';

angular.module('myApp.history', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/history', {
                controller: 'historyCtrl',
                templateUrl: 'partials/history/history.html'
            })
    }])
    .controller('historyCtrl', function ($http, $log, $scope,  Auth) {
        $scope.orders = [];

        $http.get('partials/history/history.json').success(function (res) {
            $scope.orders = res;
        }).error(function(error) {
            $log.error(error);
        });
    });