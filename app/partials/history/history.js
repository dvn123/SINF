'use strict';

angular.module('myApp.history', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/history', {
                controller: 'historyCtrl',
                templateUrl: 'partials/history/history.html'
            })
    }])
    .controller('historyCtrl', function ($http, $log, $scope, Auth, $location) {
        $scope.orders = [];

        $scope.goToEdit = function() {
          $location.path('edituser');
        };

        //http.get('/orders/?Customer=' + Auth.getCurrentUser().id)
        $http.get('partials/history/history.json').success(function (res) {
            $log.log("Novas orders: ");
            $log.log(res);

            //$log.log('/orders/?Customer=' + Auth.getCurrentUser().id);

            $scope.orders = res;
        }).error(function (error) {
            $log.error(error);
        });
    });