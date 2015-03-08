var gulp     = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    config   = require('../../config').optimize.images;

/**
 * Copy and minimize image files
 */
gulp.task('optimize:images', function() {
  return gulp.src(config.src)
    .pipe(plugins.size({title: 'images-start'}))
    .pipe(plugins.imagemin(config.options))
    .pipe(gulp.dest(config.dest))
    .pipe(plugins.size({title: 'images-end'}));
});
