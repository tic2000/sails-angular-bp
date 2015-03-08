var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    config = require('../../config').images;

gulp.task('images', function() {
  return gulp.src(config.src + '/*')
  .pipe(plugins.plumber())
  .pipe(plugins.imagemin())
  .pipe(gulp.dest(config.dest));
});
