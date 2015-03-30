(function() {
'use strict';

var authApp = angular.module('auth-controllers', ['form-helpers']);

authApp.controller('RegisterController', registerController);

/*@ngInject*/
function registerController($scope, $http, $timeout, $state, loginService) {
  var vm = this;
  vm.xhr = false;
  vm.redirect = false;
  vm.ls = loginService;

  vm.user = {
    role: 'user'
  };

  vm.registerUser = function () {
    // xhr is departing
    vm.xhr = true;
    var register = $http.post('/app/user/register', vm.user);
    vm.ls.loginUser(register);
    register.success(function (data, status, headers, config) {
      vm.xhr = false;
      vm.redirect = true;
      $timeout(function () {
        $state.go('app.home');
      }, 2000);
    })
    register.error(function (err) {
      console.log(err);
      vm.xhr = false;
    });
  };
}

authApp.controller('LoginController', loginController);
/*ngInject*/
function loginController($http, $state, loginService) {
  var vm = this;
  vm.ls = loginService;
  vm.xhr = false;

  vm.credentials = {
    wrong: false
  };

  vm.redirect = false;

  vm.loginMe = function() {
    vm.xhr = true;
    vm.credentials.wrong = false;
    var login = $http.post('/app/user/login', vm.credentials);
    vm.ls.loginUser(login);
    login.error(function(err) {
      $state.go('app.error', {'error': err});
      vm.credentials.wrong = true;
      $timeout(function () { vm.credentials.wrong = false; }, 8000);
    });
    login.finally(function() {
      vm.xhr = false;
    });
  };
}

authApp.controller('LogoutController', logoutController);
/*ngInject*/
function logoutController($http, $state, loginService) {
  var vm = this;
  vm.ls = loginService;

  vm.logoutMe = function () {
    vm.ls.logoutUser($http.get('/app/user/logout'));
  };
  vm.logoutMe();
}

})();
