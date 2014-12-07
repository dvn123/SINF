'use strict';

angular.module('myApp')
    .factory("Auth", function ($http, $log) {
        var user = {};

        return {
            getCurrentUser: function () {
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
            edit: function (user, success, error) {
                /*
                 $http.post('/register', user).success(function (res) {
                 user = res;
                 success();
                 }).error(error);
                 */
                $http.get('loginerror.json', user).success(function (res) {
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
