var gulp   = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    config = require('../../config').optimize.js;

/**
 * Copy and minimize JS files
 */
gulp.task('optimize:js', function() {
  return gulp.src(config.src)
    .pipe(plugins.concat('ag.js'))
    .pipe(plugins.size({title: 'ag.js'}))
    .pipe(plugins.uglify(config.options))
    .pipe(plugins.rename('ag.min.js'))
    .pipe(gulp.dest(config.dest))
    .pipe(plugins.size({title: 'ag.min.js'}));
});
