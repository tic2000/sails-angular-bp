(function () {
'use strict';

var navService = angular.module('nav-services', []);

navService.factory('navService', navItems);
function navItems(loginService) {

  function checkItems(menuItems) {
    var finalItems = [];
    var initialItems = angular.copy(navHeader);

    angular.forEach(initialItems, function(item, idx){
      if(loginService.authorize(item.access)) {
        if (item.children) {
          var finalItemsChildren = [];
          angular.forEach(initialItems[idx].children, function(child) {
            if(loginService.authorize(child.access)) {
              finalItemsChildren.push(child);
            }
          });
          if (finalItemsChildren.length > 0) {
            item.children = finalItemsChildren;
          }
          else {
            delete item.children;
          }
        }
        finalItems.push(item);
      }
    });
    return finalItems;
  }

  return {
    checkMenuItems: function() {
      var finalItems = checkItems();
      return finalItems;
    }
  };
}

/*
 * An Angular service which helps with creating recursive directives.
 * @author Mark Lagendijk
 * @license MIT
 */
navService.factory('RecursionHelper', ['$compile', function($compile){
  return {
    /**
     * Manually compiles the element, fixing the recursion loop.
     * @param element
     * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
     * @returns An object containing the linking functions.
     */
    compile: function(element, link){
      // Normalize the link parameter
      if(angular.isFunction(link)){
        link = { post: link };
      }

      // Break the recursion loop by removing the contents
      var contents = element.contents().remove();
      var compiledContents;
      return {
        pre: (link && link.pre) ? link.pre : null,
        /**
         * Compiles and re-adds the contents
         */
        post: function(scope, element){
          // Compile the contents
          if(!compiledContents){
            compiledContents = $compile(contents);
          }
          // Re-add the compiled contents to the element
          compiledContents(scope, function(clone){
            element.append(clone);
          });

          // Call the post-linking function, if any
          if(link && link.post){
            link.post.apply(null, arguments);
          }
        }
      };
    }
  };
}]);

})();
