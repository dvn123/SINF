'use strict';

var link = 'http://127.0.0.1:49822/api/';

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
        view.link = link;
        view.products = [ ];
        view.selectedMaterial = '*';
        view.selectedColor = '*';
        view.materials = [ ];
        view.categoryHasResults = true;

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

        var category = $route.current.params.category;
        var categoryFinal = "";

        if (category) {
            category = category.toUpperCase();
            console.log("has category");

            if(category === "BACKPACK" || category === "HARDCASE"
                || category === "MESSENGER" || category === "SHOULDER"
                || category === "SLEEVE" || category === "TOLE"
                || category === "WHEELED")
                categoryFinal = "bycategory/" + category;

        }
        else
            console.log("hasn't category");




        $http.get(link + 'products/' + categoryFinal).success(function(data) {
                view.categoryHasResults = true;
                console.log("success: " + JSON.stringify(data));
                view.products = data.products;
                view.materials = getMaterials(data.products);
                view.colors = getColors(data.products);

                if (data.products.length === 0) {
                    view.categoryHasResults = false;
                }
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

function getColors(items) {
    var colors = [];

    for(var i = 0; i < items.length; i++) {
        var subproducts = items[i].subproducts;
        for(var j = 0; j < subproducts.length; j++) {
            if(colors.indexOf(subproducts[j].color) == -1) {
                colors.push(subproducts[j].color);
                break;
            }
        }
    }
    return colors;
}