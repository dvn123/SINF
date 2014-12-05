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
            $scope.product = data.product;
            $scope.current = 0;

            $scope.select_options = {};


            var keys = Object.keys(data.product.subproducts[0]);
            for(var i = 0; i < keys.length; i++) {
                if(keys[i] != "stock") {
                    $scope.select_options[keys[i]] = [];
                }
            }

            for(var i = 0; i < data.product.subproducts.length; i++) {
                for(var key in data.product.subproducts[i]){
                    if(key != "stock") {
                        $scope.select_options[key].push(data.product.subproducts[i][key]);
                    }
                }
            }


        });
        $scope.updateSelected = function() {
            console.log("ASD" + $scope.current);
            // use $scope.selectedItem.code and $scope.selectedItem.name here
            // for other stuff ...
        };
    }]);
