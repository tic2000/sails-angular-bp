var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    config = require('../../config');

gulp.task('inject:index:prod', function () {
  var target = gulp.src('build/production/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var files = [
    config.sass.destprod + '/*@(min-)*.css',
    config.js.destprod + '/*@(min-)*.js',
  ]
  var sources = gulp.src(files, {read: false}).pipe(plugins.print());

  return target.pipe(plugins.inject(sources, {ignorePath: 'build/production'}))
    .pipe(gulp.dest('build/production'));
});
