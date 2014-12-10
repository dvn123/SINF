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

            $scope.keys = Object.keys(data.product.subproducts[0]);
            for(var i = 0; i < $scope.keys.length; i++) {
                //Set defaults
                $scope.current[$scope.keys[i]] = data.product.subproducts[0][$scope.keys[i]];

                if($scope.keys[i] != "stock" && $scope.keys[i] != "id") {
                    $scope.select_options[$scope.keys[i]] = [];
                }
            }

            $scope.master_select = $scope.keys[0];

            for(var i = 0; i < data.product.subproducts.length; i++) {
                for(var key in data.product.subproducts[i]){
                    if(key != "stock" && key != "id" && $scope.select_options[key].indexOf(data.product.subproducts[i][key]) == -1) {
                        $scope.select_options[key].push(data.product.subproducts[i][key]);
                    }
                }
            }
            console.log($scope.select_options);

            $scope.select_options_full = $scope.select_options;
            $scope.filter = {};
            $scope.filter_update($scope.master_select);
        });

        $scope.updateSelected = function(obj) {
            console.log("Key: " + obj);
            if(obj !=  $scope.master_select) {
                $scope.updateStock(obj);
                return;
            }

            $scope.filter_update(obj);
        };

        $scope.filter_update = function(obj) {
            var selected_object = null;


            for(var i = 0; i < $scope.keys.length; i++) {
                if($scope.keys[i] != $scope.master_select) {
                    $scope.filter[$scope.keys[i]] = [];
                }
            }

            //console.log(JSON.stringify($scope.filter));

            for(var i = 0; i < $scope.product.subproducts.length; i++) {
                if ($scope.current[obj] == $scope.product.subproducts[i][obj]) {
                    selected_object = $scope.product.subproducts[i];
                    console.log(selected_object);
                    for (var key in selected_object) {
                        //console.log(key);
                        if(key != $scope.master_select && $scope.filter[key].indexOf(selected_object[key]) == -1)
                            $scope.filter[key].push(selected_object[key]);
                    }
                }
            }

            console.log(JSON.stringify($scope.filter));

            for(key in $scope.select_options) {
                if(key != obj) {
                    $scope.select_options[key] = $scope.filter[key];
                    $scope.current[key] = $scope.filter[key][0];
                }
            }
            $scope.current["stock"] =  $scope.filter["stock"][0]
            $scope.current["id"] =  $scope.filter["id"][0]
        };

        $scope.updateStock = function(obj) {
            for(var i = 0; i < $scope.product.subproducts.length; i++) {
                var tmp = jQuery.extend(true, {}, $scope.product.subproducts[i]);
                delete tmp['id'];
                delete tmp['stock'];

                var tmp2 = jQuery.extend(true, {}, $scope.current);
                delete tmp2['id'];
                delete tmp2['stock'];
                console.log();
                //console.log(tmp);
                //console.log($scope.product.subproducts[i]["stock"]);
                //console.log(tmp2);
                //console.log(tmp == tmp2);
                if(angular.equals(tmp, tmp2)) {
                    console.log("FOUND - Stock = " + $scope.product.subproducts[i]["stock"]);
                    $scope.current["stock"] = $scope.product.subproducts[i]["stock"];
                    $scope.current["id"] = $scope.product.subproducts[i]["id"];
                }
            }
        };
    }]);
