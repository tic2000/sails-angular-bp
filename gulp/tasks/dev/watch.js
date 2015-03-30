var gulp   = require('gulp'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    plugins = require('gulp-load-plugins')(),
    config = require('../../config').watch;

/**
 * Start browsersync task and then watch files for changes
 */
gulp.task('watch:dev', function() {
  gulp.watch(config.sass, ['sass:build']).on('change', reload);
  gulp.watch(config.scripts, ['scripts:build', 'jshint']).on('change', reload);
  gulp.watch(config.images, ['images']).on('change', reload);
  gulp.watch(config.copyfonts, ['copy:fonts']).on('change', reload);
  gulp.watch(config.templates, ['templates']).on('change', reload);
  gulp.watch(config.copyhtml, ['copy:html', 'inject:index']).on('change', reload);
});
