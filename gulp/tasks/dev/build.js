var gulp        = require('gulp');
var runSequence = require('run-sequence');

/**
 * Run all tasks needed for a build in defined order
 */
gulp.task('build', function(callback) {
  runSequence('delete',
  'scss:lint',
  [
    'sass',
    'scripts',
    'images',
    'copy:fonts',
    'copy:html'
  ],
  [
    'inject:index',
    'base64',
  ],
  callback);
});
