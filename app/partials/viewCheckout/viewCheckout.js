'use strict';



angular.module('myApp.viewCheckout', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/checkout', {
            templateUrl: 'partials/viewCheckout/viewCheckout.html'

        });
    }])

    .controller('viewCheckout', ['$http', '$scope', '$routeParams', 'ngCart' ,function($http, $scope, $routeParams, ngCart) {
        var view = this;
        var order = {};
        order.customer = "C001";
        order.lines = [];

        //order.lines.push({"product_id": "A001","quantity":2});
        view.submitOrder = function() {
            var products = ngCart.getItems();
            console.log("--->" + JSON.stringify(products));
            console.log("-----------------------------------");

            for(var i = 0; i < products.length; i++) {
                order.lines.push({"product_id": products[i]._id,"quantity": products[i]._quantity});
            }

            console.log(order);

            console.log("***************");

            console.log(JSON.stringify(order));

            //ngCart.empty(true);
        };


    }]);
