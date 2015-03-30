(function () {
'use strict';

var navDir = angular.module('nav-directives', []);

navDir.directive('navigationItem', navItem);
function navItem(RecursionHelper) {
  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    templateUrl: '/js/nav/templates/nav-item.tpl.html',
    controller: 'TopNavItemCtrl',
    controllerAs: 'tniCtrl',
    replace: true,
    compile: function(element) {
      return RecursionHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn) {
        // Define your normal link function here.
        // Alternative: instead of passing a function,
        // you can also pass an object with
        // a 'pre'- and 'post'-link function.
      });
    }
  };
}

navDir.directive('linkTarget', function () {
  return {
    restrict: 'A',
    scope: {
      target: '=linkTarget'
    },
    link: function(scope, element, attrs) {
      if(scope.target) {  // replace with your condition
        element.attr("target", scope.target);
      }
    }
  };
});

})();
