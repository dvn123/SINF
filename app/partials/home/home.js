'use strict';
var link = 'http://127.0.0.1:49822/api/';

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'partials/home/home.html',
        controller: 'HomeCtrl'
      });
    }])

    .controller('HomeCtrl', [function() {
      var home = this;

      home.hots = [];
      home.monos = [];

      $http.get(link + 'products/').success(function(data) {
        home.hots = data;
      });
    }]);