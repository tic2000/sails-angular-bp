(function() {
'use strict';

angular.module('auth-resolver', ['ngMessages', 'auth-controllers']).config(authResolver);

/*@ngInject*/
function authResolver($stateProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      views: {
        '': {
          template: '<ui-view class="container"></ui-view>'
        },
        'navbar': {
          controller: 'TopNavController',
          controllerAs: 'tnCtrl',
          templateUrl: '/js/nav/templates/navbar.tpl.html'
        }
      },
      resolve: {
        'login': function (loginService, $q, $http) {
          var roleDefined = $q.defer();

          /**
           * In case there is a pendingStateChange means the user requested a $state,
           * but we don't know yet user's userRole.
           *
           * Calling resolvePendingState makes the loginService retrieve his userRole remotely.
           */
          if (loginService.pendingStateChange) {
            return loginService.resolvePendingState($http.get('/app/user/check'));
          } else {
            roleDefined.resolve();
          }
          return roleDefined.promise;
        }
      }
    })
    .state('app.register', {
      url: '/register',
      templateUrl: '/js/auth/templates/register.tpl.html',
      controller: 'RegisterController',
      controllerAs: 'registerCtrl',
      accessLevel: accessLevels.anon,
      data: {
        title: 'Register'
      }
    })
    .state('app.login', {
      url: '/login',
      templateUrl: '/js/auth/templates/login.tpl.html',
      controller: 'LoginController',
      controllerAs: 'loginCtrl',
      accessLevel: accessLevels.anon,
      data: {
        title: 'Login'
      }
    })
    .state('app.logout', {
      url: '/logout',
      controller: 'LogoutController',
      controllerAs: 'logoutCtrl',
      accessLevel: accessLevels.user,
      data: {
        title: 'Logout'
      }
    })
    .state('app.authenticated', {
      url: '/authenticated',
      template: '<p>Authenticated</p>',
      accessLevel: accessLevels.user,
      data: {
        title: 'Authenticated'
      }
    })
    .state('app.editor', {
      url: '/editor',
      template: '<p>EDITOR</p>',
      accessLevel: accessLevels.editor,
      data: {
        title: 'Editor'
      }
    })
    .state('app.admin', {
      url: '/admin',
      template: '<p>ADMINISTRATOR</p>',
      accessLevel: accessLevels.admin,
      data: {
        title: 'Administrator'
      }
    })
    .state('app.error', {
      url: '/error/:error',
      template: '<p>Access Denied</p>',
      data: {
        title: 'Error'
      }
    });
}

})();
