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
    .filter('productsFilter', function() {
        return function (items, params) {
            /*var newItems = [];
             var material = params.material;
             for (var i = 0; i < items.length; i++) {
             if (material == '*')
             newItems.push(items[i]);
             else if (items[i].material == material)
             newItems.push(items[i]);
             };*/
            var material = filter("material", params.material, items);
            return filter("colors", params.color, material);
        }
    })

    .controller('viewCategoryCtrl', ['$http', '$route', function($http, $route) {
        var view = this;
        view.products = [ ];
        view.material = '*';
        view.color = '*';

        console.log($route.current.params);
        $http.get('viewProducts/list.JSON').success(function(data) {
                console.log("benfica");
                view.products = data.products;
            }
        );

        /*view.filter = function(products) {
         var newProducts = [ ];

         for(var i = 0; i < products.length; i++) {
         if (view.material == '*')
         newProducts.push(products[i]);
         else if (product.material == view.material)
         newProducts.push(products[i]);
         }
         return newProducts;
         }*/

        view.setMaterial = function(material) {
            view.material = material;
        }
        view.setColor = function(color) {
            view.color = color;
        }




    }]);

function showCategory(category) {
    $('.portfolio-item').hide();
    $(category).slideToggle();
}
/**
 *
 * @param field product field to filter
 * @param filter value of the filter
 * @param items items to filter
 * @returns {Array}
 */
function filter(field, filter, items) {
    var newItems = [];

    for (var i = 0; i < items.length; i++) {
        if (filter == '*') {
            newItems.push(items[i]);
            continue;
        }

        var value = items[i][field];
        if (typeof value == "object") {
            for(var j = 0; j < value.length; j++)
                if (value[j] == filter)
                    newItems.push(items[i]);

        }
        else if (value == filter)
            newItems.push(items[i]);
    };

    return newItems;
}