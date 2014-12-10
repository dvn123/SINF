'use strict';

var link = 'partials/viewProducts/new_list.json';

angular.module('myApp.viewProducts', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/viewProducts', {
            templateUrl: 'partials/viewProducts/viewProducts.html',
            controller: 'viewCategoryCtrl'
        }).when('/viewProducts/:category', {
            templateUrl: 'partials/viewProducts/viewProducts.html',
            controller: 'viewCategoryCtrl'
        });
    }])

    /*.controller('viewProductsCtrl', ['$http', function($http) {
     var view = this;
     view.products = [ ];

     $http.get(link).success(function(data) {
     view.products = data.products;
     }
     );




     }])*/
    .filter('productsFilter', function() {
        return function (items, params) {
            var filteredByMaterial = filter("material", params.material, items);

            return filterByColor(filteredByMaterial, params.color);
            //var material = filter("material", params.material, items);
            //return filter("colors", params.color, material);
            //return filterByColor(selectedMaterial, params.selectedColor);
        }
    })

    .controller('viewCategoryCtrl', ['$http', '$route', function($http, $route) {
        var view = this;
        view.products = [ ];
        view.selectedMaterial = '*';
        view.selectedColor = '*';
        view.materials = [ ];

        view.setMaterial = function(material) {
            view.selectedMaterial = material;
            console.log("New material: " + material);
        };

        view.setColor = function(color) {
            view.selectedColor = color;
        };

        view.getColor = function() {
            return view.selectedColor;
        }

        view.getMaterial = function() {
            return view.selectedMaterial;
        }


        if ($route.current.params.category)
            console.log("has category")
        else
            console.log("hasn't category");
        //console.log($route.current.params);


        $http.get(link).success(function(data) {
                view.products = data.products;
                view.materials = getMaterials(data.products);
            }
        );
















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
        if (value.toUpperCase() == filter.toUpperCase())
            newItems.push(items[i]);
    };

    return newItems;
}

function filterByColor(items, color) {

    if (color === "*")
        return items;

    var newItems = [];

    for(var i = 0; i < items.length; i++) {
        var subproducts = items[i].subproducts;
        for(var j = 0; j < subproducts.length; j++) {
            if(subproducts[j].color.toUpperCase() === color.toUpperCase()) {
                newItems.push(items[i]);
                break;
            }
        }
    }
    return newItems;
}

function getMaterials(products) {
    var materials = [];


    for(var i in products) {
        // console.log(products);
        if (materials.indexOf(products[i].material) == -1)
            materials.push(products[i].material);
    }

    return materials;
}