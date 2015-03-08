var gulp   = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    config = require('../../config').base64;

/**
 * Replace urls in CSS fies with base64 encoded data
 */
gulp.task('base64', ['sass'], function() {
  return gulp.src(config.src)
    .pipe(plugins.base64(config.options))
    .pipe(gulp.dest(config.dest));
});
