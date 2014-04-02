'use strict';

var defaultCompany = 'txtr';

angular.module('angularApp').controller('LoginCtrl', function ($scope, companyMgmt, authMgmt, UserService) {
  $scope.alerts = [];

  $scope.addAlert = function(message) {
    $scope.alerts.push({type: 'danger', msg: message});
  };

  $scope.addInfo = function(message) {
    $scope.alerts.push({type: 'info', msg: message});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  companyMgmt.getCompany(defaultCompany).success(function(data) {
    $scope.company = data.result.name;
    $scope.natures = data.result.natures;
  });

  $scope.login = function() {
      $scope.alerts = [];
      authMgmt.authenticate($scope.userLogin, $scope.userPassword, $scope.userNature)
        .success(function(data) {
          if(data.result !== null && data.result.resultCode === 'SUCCESS') {
            UserService.isLoggedIn = true;
            UserService.token = data.result.token;
            UserService.user = data.result.user;
            $scope.addInfo('Logged in as ' + UserService.user.userName + '.');
          } else if (data.error !== null && data.error.msg !== null){
            $scope.addAlert(data.error.msg);
          } else {
            $scope.addAlert('Login failed.');
          }

        });
    };

});