'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.viewProducts',
  'myApp.viewProduct',
  'myApp.version'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])

.directive('wrapOwlcarousel', function () {
  return {
    restrict: 'E',
    link: function (scope, element, attrs) {
      var options = scope.$eval($(element).attr('data-options'));
      $(element).owlCarousel(options);
    }
  };
});