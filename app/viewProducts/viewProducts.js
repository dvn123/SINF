'use strict';

angular.module('myApp.viewProducts', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/viewProducts', {
            templateUrl: 'viewProducts/viewProducts.html',
            controller: 'viewProductsCtrl'
        }).when('/viewProducts/:category', {
            templateUrl: 'viewProducts/viewProducts.html',
            controller: 'viewCategoryCtrl'
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

    .controller('viewCategoryCtrl', ['$http', '$route', function($http, $route) {
        var view = this;
        view.products = [ ];

        console.log($route.current.params);
        $http.get('viewProducts/list.JSON').success(function(data) {
                console.log("benfica");
                view.products = data.products;
            }
        );




    }]);

function showCategory(category) {
    $('.portfolio-item').hide();
    $(category).slideToggle();
}