var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    bowerFiles = require('main-bower-files'),
    config = require('../../config').copyhtml;

gulp.task('copy:html', function() {
  return gulp.src(config.src)
  .pipe(plugins.plumber())
  .pipe(gulp.dest(config.dest));
})
