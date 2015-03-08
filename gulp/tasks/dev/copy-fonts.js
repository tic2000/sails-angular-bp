var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    bowerFiles = require('main-bower-files'),
    config = require('../../config').copyfonts;

gulp.task('copy:fonts', function() {
  return gulp.src(bowerFiles(config.src))
  .pipe(plugins.plumber())
  .pipe(gulp.dest(config.dest));
})
