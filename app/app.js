'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'myApp.view1',
    'myApp.home',
    'myApp.viewProducts',
    'myApp.viewProduct',
    'myApp.version',
    'myApp.history',
    'myApp.editUser',
    'myApp.viewCheckout',
    'myApp.faq',
    'myApp.contact',
    'ui.bootstrap',
    'datatables',
    'angularUtils.directives.dirPagination',
    'ngCart'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .otherwise({redirectTo: '/'});
    }])

    .config(function(paginationTemplateProvider) {
        paginationTemplateProvider.setPath('bower_components/angular-utils-pagination/dirPagination.tpl.html');
    })

    .directive('wrapOwlcarousel', function () {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                var options = scope.$eval($(element).attr('data-options'));
                $(element).owlCarousel(options);
            }
        };
    })
    .controller('globalController', function ($scope, $modal, $log, Auth) {
        $scope.open = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'loginModal.html',
                controller: 'loginModalController',
                size: size
            });

            modalInstance.result.then(function (user) {
                $scope.user = user;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.user = Auth.getCurrentUser();

        $scope.hasUser = function () {
            return typeof $scope.user.email !== 'undefined';
        };

        $scope.logout = function () {
            Auth.logout(function (data) {
                    $log.info("Logout success: " + data);
                    $scope.user = {};
                },
                function (error) {
                    $log.error("Logout error: " + error);
                    $scope.errorMessage = error.message;
                });
        }
    })
    .controller('loginModalController', function ($scope, $modalInstance, $http, $log, Auth) {
        $scope.errorMessage = "";
        $scope.activeForm = "login";
        $scope.newuser = {};

        $scope.switchToRegister = function () {
            $scope.activeForm = "register";
            $scope.errorMessage = "";
        };

        $scope.switchToLogin = function () {
            $scope.activeForm = "login";
            $scope.errorMessage = "";
        };

        $scope.differentPasswords = function () {
            return $scope.newuser.password !== $scope.newuser.password2;
        };

        $scope.invalidForm = function () {
            return $scope.differentPasswords();
        };

        $scope.ok = function () {
            $("#modalSubmitButton").blur();

            if ($scope.activeForm === "login")
                Auth.login($scope.newuser,
                    function (data) {
                        $modalInstance.close(data);
                    },
                    function (error) {
                        $scope.errorMessage = error.message;
                    });
            else
                Auth.register($scope.newuser,
                    function (data) {
                        $modalInstance.close(data);
                    },
                    function (error) {
                        $scope.errorMessage = error.message;
                    });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .filter('TruncateWords', [
        function(){
            return function(input, words){

                if (isNaN(words)) return input;
                if (words <= 0) return '';
                if (input) {
                    var inputWords = input.split(/\s+/);
                    if (inputWords.length > words) {
                        input = inputWords.slice(0, words).join(' ');
                    }
                }
                return input;

            };
        }
    ]);