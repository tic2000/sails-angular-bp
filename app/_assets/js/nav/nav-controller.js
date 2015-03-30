(function () {
'use strict';

var nav = angular.module('app-navigation', ['nav-services', 'nav-directives']);

nav.controller('TopNavController', topNavCtrl);
function topNavCtrl($scope, navService, $rootScope) {
  var vm = this;

  vm.menuItems = navService.checkMenuItems();

  $rootScope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {
    if (fromState.name == 'app.register' || fromState.name == 'app.login' || fromState.name == 'app.logout') {
      vm.menuItems = navService.checkMenuItems();
    }
  });


}

nav.controller('FooterNavCtrl', footerNavCtrl)
function footerNavCtrl($scope, navService, $http, $sailsSocket, $filter) {
  var vm = this;
}

nav.controller('TopNavItemCtrl', topNavItemCtrl);
function topNavItemCtrl($scope, navService, $state) {
  var vm = this;
  vm.menuItem = $scope.item;
  $scope.$state = $state;
}

})();
