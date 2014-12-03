'use strict';

angular.module('myApp.viewProducts', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/viewProducts', {
            templateUrl: 'viewProducts/viewProducts.html',
            controller: 'viewProductsCtrl'
        }).when('/viewProducts/:productID', {
            templateUrl: 'viewProducts/viewProducts.html',
            controller: 'viewBackpackCtrl'
        });
    }])

    .controller('viewProductsCtrl', ['$http', function($http) {
        var view = this;
        view.products = [ ];

        $http.get('viewProducts/list.JSON').success(function(data) {
                console.log(data);
                view.products = data.products;
            }
        );




    }])

    .controller('viewBackpackCtrl', ['$http', function($http) {
        var view = this;
        view.products = [ ];

        $http.get('viewProducts/list.JSON').success(function(data) {
                console.log("benfica");
                view.products = data.products;
            }
        );




    }]);