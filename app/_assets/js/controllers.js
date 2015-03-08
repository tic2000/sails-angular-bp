(function () {
'use strict';

var app = angular.module('main-controller', []);
app.controller('AgAppController', agAppController);

/*@ngInject*/
function agAppController($rootScope) {
  var vm = this;
  $rootScope.title = 'Anai Greog';
}

})();
