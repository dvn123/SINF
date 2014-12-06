'use strict';



angular.module('myApp.viewCheckout', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/checkout', {
            templateUrl: 'partials/viewCheckout/viewCheckout.html'

        });
    }]);/*

    .controller('viewCheckout', ['$http', '$scope', '$routeParams' ,function($http, $scope, $routeParams) {

    }]);
*/