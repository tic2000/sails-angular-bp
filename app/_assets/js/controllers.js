(function () {
'use strict';

var app = angular.module('main-controller', []);
app.controller('AgAppController', agAppController);

/*@ngInject*/
function agAppController($scope, $location, $state, $stateParams, $http, $timeout, $window, loginService) {
  var vm = this;
  vm.title= 'custom title';
  vm.$location = $location;
  vm.ls = loginService;

  // Expose $state and $stateParams to the <body> tag
  vm.$state = $state;
  vm.$stateParams = $stateParams;

  // Authentication service
  vm.authLoading = true;
  vm.isAdmin = false;

}

})();
