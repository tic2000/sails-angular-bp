/**
 * Directly from fnakstad
 * https://github.com/fnakstad/angular-client-side-auth/blob/master/client/js/routingConfig.js
 */

(function (exports) {

  navHeader = [
    {
      title: 'Home',
      state: 'app.home',
      access: 'public'
    },
    {
      title: 'Pages',
      state: 'app.home',
      access: 'public',
      children: [
        {
          title: 'Public Page',
          state: 'app.home',
          access: 'public'
        },
        {
          title: 'Authenticated Page',
          state: 'app.authenticated',
          access: 'user'
        },
        {
          title: 'Editor Page',
          state: 'app.editor',
          access: 'editor'
        },
        {
          title: 'Admin Page',
          state: 'app.admin',
          access: 'admin'
        },
        {
          title: 'Google',
          url: 'http://www.google.com',
          target: '_blank',
          access: 'public'
        }
      ]
    },
    {
      title: 'Register',
      state: 'app.register',
      access: 'anon'
    },
    {
      title: 'Login',
      state: 'app.login',
      access: 'anon'
    },
    {
      title: 'Logout',
      state: 'app.logout',
      access: 'user'
    }
  ];

  navFooter = [];

  exports.navHeader = navHeader;
  exports.navFooter = navFooter;

})(typeof exports === 'undefined' ? this : exports);
