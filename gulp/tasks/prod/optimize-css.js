var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    config = require('../../config').optimize.css;

/**
 * Copy and minimize CSS files
 */
gulp.task('optimize:css', function() {
  return gulp.src(config.src)
    .pipe(plugins.concat('ag.css'))
    .pipe(gulp.dest(config.dest))
    .pipe(plugins.size({title: 'ag.css'}))
    .pipe(plugins.minifyCss(config.options))
    .pipe(plugins.rename('ag.min.css'))
    .pipe(gulp.dest(config.dest))
    .pipe(plugins.size({title: 'ag.min.css'}));
});
