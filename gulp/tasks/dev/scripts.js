var gulp = require('gulp'),
    bowerFiles = require('main-bower-files'),
    browserSync = require('browser-sync'),
    minimist = require('minimist'),
    del = require('del'),
    plugins = require('gulp-load-plugins')(),
    runSequence = require('run-sequence'),
    config = require('../../config').js;


// Copy libraries
gulp.task('scripts:libs', function() {
  var files = bowerFiles('**/*.js');
  return gulp.src(files)
  .pipe(plugins.plumber())
  .pipe(gulp.dest(config.dest + '/libs'));
});

// Copy custom js
gulp.task('scripts:build', function() {

  browserSync.notify('Compiling Javascript');

  return gulp.src(config.src + '/**/*.js')
  .pipe(plugins.plumber())
  .pipe(plugins.ngAnnotate())
  .pipe(gulp.dest(config.dest));
});

gulp.task('templates',function() {
  return gulp.src(config.src + '/**/*.tpl.html')
  .pipe(plugins.plumber())
  .pipe(plugins.angularTemplatecache(config.template.filename, config.template))
  .pipe(gulp.dest(config.dest));
});

gulp.task('scripts', function(callback) {
  return runSequence(
    ['scripts:libs', 'scripts:build'],
    'templates',
    callback
  );
});
