var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    bowerFiles = require('main-bower-files'),
    config = require('../../config');

gulp.task('copy:html', function() {
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var files = [
    config.sass.dest + '/!(ag|lumx)*.css',
    config.sass.dest + '/ag.css',
    config.js.dest + '/libs/jquery.js',
    config.js.dest + '/libs/angular.js',
    config.js.dest + '/libs/!(lumx)*.js',
    config.js.dest + '/libs/lumx.js',
    config.js.dest + '/**/!(app)*.js',
    config.js.dest + '/!(app)*.js',
    config.js.dest + '/app.js'
  ]
  var sources = gulp.src(files, {read: false});
  return gulp.src(config.copyhtml.src)
  .pipe(plugins.plumber())
  .pipe(gulp.dest(config.copyhtml.dest))
  .pipe(plugins.inject(sources, {ignorePath: 'build/development'}))
  .pipe(gulp.dest('build/development'));
})
