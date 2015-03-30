(function () {
'use strict';

var app = angular.module('agApp', [
  'ui.router', 'auth-resolver', 'main-controller', 'login-service', 'templates', 'angular-storage', 'sails.io',
  'angularUtils.directives.dirPagination', 'app-navigation']);

app.run(function ($rootScope, $state, $stateParams, $sailsSocket, store) {
  // It's very handy to add references to $state and $stateParams to the $rootScope
  // so that you can access them from any scope within your applications.For example,
  // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
  // to active whenever 'contacts.list' or one of its decendents is active.
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  /**
   * $rootScope.doingResolve is a flag useful to display a spinner on changing states.
   * Some states may require remote data so it will take awhile to load.
   */
  var resolveDone = function () { $rootScope.doingResolve = false; };
  $rootScope.doingResolve = false;

  $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
    $rootScope.doingResolve = true;
    $rootScope.title = 'Sails Angular Boilerplate';
    if (toState.data && toState.data.title) {
      $rootScope.title = toState.data.title + ' - Sails Angular Boilerplate';
    }
  });
  $rootScope.$on('$stateChangeSuccess', resolveDone);
  $rootScope.$on('$stateChangeError', resolveDone);
  $rootScope.$on('$statePermissionError', resolveDone);

  var userToken = store.get('sabAppUser');
  if (userToken) {
    userToken = userToken.token;
    $sailsSocket.defaults.headers.common['X-Token'] = userToken;
  }
});

app.config(function ($stateProvider, $urlRouterProvider, paginationTemplateProvider) {
  $urlRouterProvider.when('', '/home');
  $stateProvider
    .state('app.home', {
      url: '/home',
      template: '<p>HOME</p>',
      data: {
        title: 'Home'
      }
    });

  //paginationTemplateProvider.setPath('/bower_components/angular-utils-pagination/dirPagination.tpl.html');
});

})();
