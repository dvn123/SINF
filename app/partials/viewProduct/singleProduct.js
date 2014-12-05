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
            $scope.current = {};

            $scope.select_options = {};



            var keys = Object.keys(data.product.subproducts[0]);
            for(var i = 0; i < keys.length; i++) {
                if(keys[i] != "stock") {
                    $scope.select_options[keys[i]] = [];
                }
            }

            $scope.master_select = keys[0];

            for(var i = 0; i < data.product.subproducts.length; i++) {
                for(var key in data.product.subproducts[i]){
                    if(key != "stock") {
                        $scope.select_options[key].push(data.product.subproducts[i][key]);
                    }
                }
            }
            $scope.select_options_full = $scope.select_options;
        });
        $scope.updateSelected = function(obj) {
            console.log(obj + "ASD" + $scope.current["color"]);

            if(obj !=  $scope.master_select)
                return;

            var selected_object;

            var filter = {};

            var keys = Object.keys($scope.product.subproducts[0]);
            for(var i = 0; i < keys.length; i++) {
                if(keys[i] != $scope.master_select) {
                    filter[keys[i]] = [];
                }
            }

            for(var i = 0; i < $scope.product.subproducts.length; i++) {
                for(var key2 in $scope.product.subproducts[i]) {
                    if ($scope.current[key2] == $scope.product.subproducts[i][key2]) {
                        selected_object = $scope.product.subproducts[i][key2];
                        for (var key in selected_object) {
                            filter[key].push(selected_object[key]);
                        }
                    }
                }
            }

            console.log(JSON.stringify(filter));

            for(key in $scope.select_options) {
                if(key != obj) {
                    $scope.select_options[key] = filter[key];
                }
            }
            // use $scope.selectedItem.code and $scope.selectedItem.name here
            // for other stuff ...
        };
    }]);
