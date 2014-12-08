'use strict';

angular.module('myApp.viewProducts', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/viewProducts', {
            templateUrl: 'partials/viewProducts/viewProducts.html',
            controller: 'viewProductsCtrl'
        }).when('/viewProducts/:category', {
            templateUrl: 'partials/viewProducts/viewProducts.html',
            controller: 'viewCategoryCtrl'
        });
    }])

    .controller('viewProductsCtrl', ['$http', function($http) {
        var view = this;
        view.products = [ ];

        $http.get('partials/viewProducts/list.JSON').success(function(data) {
                view.products = data.products;
            }
        );




    }])
    .filter('productsFilter', function() {
        return function (items, params) {
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
        $http.get('partials/viewProducts/list.JSON').success(function(data) {
                view.products = data.products;
            }
        );

        view.setMaterial = function(material) {
            view.material = material;
        };

        view.setColor = function(color) {
            view.color = color;
        };




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