'use strict';

var link = 'http://127.0.0.1:49822/api/';

angular.module('myApp.history', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/history', {
                controller: 'historyCtrl',
                templateUrl: 'partials/history/history.html'
            })
    }])
    .controller('historyCtrl', function ($http, $log, $scope, Auth, $location, $route, $modal) {
        $scope.orders = [];

        $scope.goToEdit = function () {
            $location.path('edituser');
        };

        //$http.get(link + '/orders/?Customer=' + Auth.getCurrentUser().id)
        //$http.get('partials/history/history.json')
        $scope.refreshOrders = function () {
            $http.get(link + 'orders/?Customer=' + Auth.getCurrentUser().id).success(function (res) {
                $log.log("Novas orders: ");
                $log.log(res);

                $scope.orders = res['orders'];
            }).error(function (error) {
                $log.error(error);
            });
        };

        $scope.$on('$routeChangeSuccess', function () {
            $scope.refreshOrders();
        });


        $scope.open = function (size, index) {
            $modal.open({
                templateUrl: 'historyModal.html',
                controller: 'historyModalCtrl',
                size: size,
                resolve: {
                    item: function () {
                        return $scope.orders[index];
                    }
                }
            });
        };
    })
    .controller('historyModalCtrl', function ($scope, $http, $log, item) {
        $scope.order = {};

        $http.get(link + 'orders/' + item.id).success(function (res) {
            $scope.order = res;
        }).error(function (error) {
            $log.error(error);
        });
    })
    .filter('translateState', function () {
        return function (state) {
            switch (state) {
                case 'P':
                    return 'Pending';
                case 'A':
                    return 'Cancelled';
                case 'F':
                    return 'Closed';
                default:
                    return state;
            }
        };
    });