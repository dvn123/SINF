'use strict';

angular.module('myApp.viewProduct', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/products/:productID', {
            templateUrl: 'partials/viewProduct/single-product.html',
            controller: 'viewProductCtrl'
        });
    }])

    .controller('viewProductCtrl', ['$http', '$scope', '$routeParams' ,function($http, $scope, $routeParams) {
        $http.get('partials/viewProduct/1.json').success(function(data) {
            $scope.product = data;
        });
    }]);