var gulp   = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var plugins = require('gulp-load-plugins')();
var config = require('../../config').watch;

/**
 * Start browsersync task and then watch files for changes
 */
gulp.task('watch:dev', function() {
  gulp.watch(config.sass, ['sass', 'scss:lint']).on('change', reload);
  gulp.watch(config.scripts, ['scripts', 'jshint']).on('change', reload);
  gulp.watch(config.images, ['images']).on('change', reload);
  gulp.watch(config.copyfonts, ['copy:fonts']).on('change', reload);
  gulp.watch(config.copyhtml, ['copy:html', 'inject:index']).on('change', reload);
  //gulp.watch(config.sprites, ['sprites']);
});
