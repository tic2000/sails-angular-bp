var gulp = require('gulp'),
    bowerFiles = require('main-bower-files'),
    minimist = require('minimist'),
    del = require('del'),
    plugins = require('gulp-load-plugins')(),
    config = require('../../config').js;


// Script
// Uglifies
gulp.task('scripts:libs', function() {
  var files = bowerFiles('**/*.js');
  gulp.src(files)
  .pipe(plugins.plumber())
  //.pipe(plugins.uglify())
  .pipe(gulp.dest(config.dest + '/libs'));
  gulp.src(config.src + '/*.js')
  .pipe(plugins.plumber())
  .pipe(plugins.ngAnnotate())
  //.pipe(plugins.uglify())
  .pipe(gulp.dest(config.dest));
});

gulp.task('scripts', ['scripts:libs']);
