'use strict';


var loginModule = angular.module('angularApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

var url = 'http://localhost:8081/api/1.50.20.7/rpc';

loginModule.factory('companyMgmt', function($http) {
    var factory = {};
    factory.getCompany = function(companyName) {
        var postParameters = {
          id: 42,
          method: 'IWSReaktorMgmt.getCompany',
          params: [companyName]
        };
        $http.defaults.headers.common.Accept = 'application/json';
        return $http.post(url, postParameters);
      };
    return factory;
  });

loginModule.factory('authMgmt', function($http) {
    var factory = {};
    factory.authenticate = function(login, password, nature) {
        var hashedPassword = CryptoJS.SHA1(password).toString(CryptoJS.enc.Base64);
        var postParameters = {
          id: 42,
          method: 'IWSAuth.authenticate',
          params: [login, hashedPassword, nature, false]
        };
        $http.defaults.headers.common.Accept = 'application/json';
        return $http.post(url, postParameters);
      };
    return factory;
  });

loginModule.factory('UserService', [function() {
  var sdo = {
    isLoggedIn: false,
    user: null,
    token: ''
  };
  return sdo;
}]);