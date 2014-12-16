'use strict';

var link = 'http://127.0.0.1:49822/api';

angular.module('myApp.history', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/history', {
                controller: 'historyCtrl',
                templateUrl: 'partials/history/history.html'
            })
    }])
    .controller('historyCtrl', function ($http, $log, $scope, Auth, $location, $route) {
        $scope.orders = [];

        $scope.goToEdit = function() {
          $location.path('edituser');
        };

        //$http.get(link + '/orders/?Customer=' + Auth.getCurrentUser().id)
        //$http.get('partials/history/history.json')
        $scope.refreshOrders = function() {
            $http.get(link + '/orders/?Customer=' + Auth.getCurrentUser().id).success(function (res) {
                $log.log("Novas orders: ");
                $log.log(res);

                $scope.orders = res['orders'];
            }).error(function (error) {
                $log.error(error);
            });
        };

        $scope.$on('$routeChangeSuccess', function() {
            $scope.refreshOrders();
        });
    });