'use strict';
var link = 'http://127.0.0.1:49822/api/';


angular.module('myApp.viewCheckout', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/checkout', {
            templateUrl: 'partials/viewCheckout/viewCheckout.html'

        });
    }])

    .controller('viewCheckout', ['$http', '$scope', '$routeParams', 'ngCart', 'Auth', function($http, $scope, $routeParams, ngCart, Auth) {
        var view = this;
        var order = {};
        order.customer = "C001";
        order.lines = [];
        view.hasUser = Auth.hasUser();
        view.isEmpty = ngCart.getItems().length === 0;

        view.checkingOut = false;
        view.ngCart = ngCart;

        //order.lines.push({"product_id": "A001","quantity":2});
        view.submitOrder = function() {
            var products = ngCart.getItems();

            for(var i = 0; i < products.length; i++) {
                order.lines.push({"product_id": products[i]._id,"quantity": products[i]._quantity});
            }

            view.checkingOut = true;

            $http.post(link + 'orders', order).success(function(data) {
                console.log("Order completed ID: " + data);
                view.checkingOut = false;

            });

            ngCart.empty(true);
        };


    }]);
