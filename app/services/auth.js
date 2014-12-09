'use strict';

angular.module('myApp')
    .factory("Auth", function ($http, $log, $cookieStore) {
        var user = $cookieStore.get('user') || {};

        return {
            getCurrentUser: function () {
                return user;
            },
            register: function (user, success, error) {
                /*
                 $http.post('/Customers/', user)
                 */
                $log.log("Antes register: ");
                $log.log(user);

                $http.get('login.json', user).success(function (res) {
                    if (res.error)
                        error(res.error);
                    else {
                        $cookieStore.put('user', res);
                        user = res;

                        $log.log("Depois register: ");
                        $log.log(user);

                        success(res);
                    }
                }).error(error);
            },
            edit: function (user, success, error) {
                /*
                 $http.put('/Customers/', user)
                 */
                $log.log("Antes edit: ");
                $log.log(user);

                $http.get('login.json', user).success(function (res) {
                    if (res.error)
                        error(res.error);
                    else {
                        $cookieStore.put('user', res);
                        user = res;

                        $log.log("Depois edit: ");
                        $log.log(user);

                        success(res);
                    }
                }).error(error);
            },
            login: function (user, success, error) {
                /*
                 $http.post('/Customers/login', user)
                 */
                $http.get('login.json', user).success(function (res) {
                    if (res.error)
                        error(res.error);
                    else {
                        $cookieStore.put('user', res);
                        user = res;

                        $log.log("Depois login: ");
                        $log.log(user);

                        success(res);
                    }
                }).error(error);
            },
            logout: function (success, error) {
                user = {};
                $cookieStore.remove('user');
                success();
                /*
                 $http.post('/Customers/logout', user).sucess(function(res) {
                 user = {};
                 $cookieStore.remove('user');
                 success();
                 }).error(error);
                 */
            }
        };
    });
