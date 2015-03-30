var gulp        = require('gulp');
var browsersync = require('browser-sync');
var config      = require('../../config').browsersync.development;
var watch       = require('../../config').watch

/**
 * Run the build task and start a server with BrowserSync
 */
gulp.task('browsersync', ['build', 'watch:dev'], function() {
  return browsersync(config);

  //gulp.watch(watch.copyhtml, ['copy:html']);
});
