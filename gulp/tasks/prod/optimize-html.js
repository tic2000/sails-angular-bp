var gulp    = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    config  = require('../../config').optimize.html;

/**
 * Minimize HTML
 */
gulp.task('optimize:html', function() {
  return gulp.src(config.src)
    .pipe(plugins.size({title: 'html-start'}))
    .pipe(plugins.htmlmin(config.options))
    .pipe(gulp.dest(config.dest))
    .pipe(plugins.size({title: 'html-end'}));
});
