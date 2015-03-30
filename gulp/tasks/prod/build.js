var gulp        = require('gulp');
var runSequence = require('run-sequence');

/**
 * Run all tasks needed for a build in defined order
 */
gulp.task('build:production', function(callback) {
  return runSequence('delete:prod',
  [
    'sass',
    'scripts:libs',
    'templates',
    'images',
    'copy:fonts:prod',
    'copy:html:prod'
  ],
  [
    'inject:index',
    'base64',
  ],
  [
    'optimize:css',
    'optimize:js',
    'optimize:images',
    'optimize:html',
  ],
  'revision',
  'rev:collect',
  [
    'webp',
    'gzip'
  ],
  'inject:index:prod',
  callback);
});
