(function() {
'use strict';

var fhApp = angular.module('form-helpers', []);

/**
 * Simple directive to check fields equality
 *
 * usage:
 * <input type="password" ng-model="password" field-match="password2">
 * <input type="password" ng-model="password2">
 */
fhApp.directive('fieldMatch', fieldMatch);
function fieldMatch() {
  return {
    restrict: 'A',
    scope: false,
    require: 'ngModel',
    link: function (scope, elem, attrs, controller) {
      var checker = function () {
        // get the value of the first field
        var fld1 = scope.$eval(attrs.ngModel);
        // get the value of the other field
        var fld2 = scope.$eval(attrs.fieldMatch);
        return fld1 === fld2;
      };
      scope.$watch(checker, function (fldMatch) {
        controller.$setValidity('match', fldMatch);
      });
    }
  };
}

fhApp.directive('userAvailable', userAvailable);
/*@ngInject*/
function userAvailable($http) {
  return {
    require : 'ngModel',
    scope: {
      checkField: '@userAvailable'
    },
    link : function(scope, element, attrs, ngModel) {
      var args = {};
      ngModel.$asyncValidators.userAvailable = function(value) {
        args[scope.checkField] = value;
        return $http.post('/app/user/exists', args);
      };
    }
  };
}

})();
