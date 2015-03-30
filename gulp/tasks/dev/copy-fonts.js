var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    bowerFiles = require('main-bower-files'),
    config = require('../../config').copyfonts;

gulp.task('copy:fonts', function() {
  return gulp.src(config.src)
  .pipe(plugins.plumber())
  .pipe(plugins.rename(function(path) {
    var dest = path.dirname.split('/fonts/');
    path.dirname = dest[1];
  }))
  .pipe(gulp.dest(config.dest));
})
