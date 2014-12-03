'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.viewProducts',
    'myApp.viewProduct',
    'myApp.version',
    'ui.bootstrap'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .otherwise({redirectTo: '/view1'});
    }])
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

        $scope.user = Auth.isLoggedIn();

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
    .factory("Auth", function ($http, $log) {
        var user = {};

        return {
            isLoggedIn: function () {
                return user;
            },
            register: function (user, success, error) {
                /*
                 $http.post('/register', user).success(function (res) {
                 user = res;
                 success();
                 }).error(error);
                 */
                $http.get('login.json', user).success(function (res) {
                    if (res.error)
                        error(res.error);
                    else {
                        user = res;
                        success(user);
                    }
                }).error(error);
            },
            login: function (user, success, error) {
                /*
                 $http.post('login.json', user).success(function (res) {
                 if (res.error)
                 error(res.error);
                 else {
                 user = res;
                 success(user);
                 }
                 }).error(error);
                 */
                $http.get('login.json', user).success(function (res) {
                    if (res.error)
                        error(res.error);
                    else {
                        user = res;
                        success(user);
                    }
                }).error(error);
            },
            logout: function (success, error) {
                user = {};
                success();
                /*
                 $http.post('/logout').success(function () {
                 user = {};
                 success();
                 }).error(error);
                 */
            }
        };
    });