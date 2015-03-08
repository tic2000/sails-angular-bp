var gulp   = require('gulp')
    plugins = require('gulp-load-plugins')(),
    config = require('../../config').revision;

/**
 * Revision all asset files and
 * write a manifest file
 */
gulp.task('revision', function() {
  return gulp.src(config.src.assets, { base: config.src.base })
    .pipe(gulp.dest(config.dest.assets))
    .pipe(plugins.rev())
    .pipe(gulp.dest(config.dest.assets))
    .pipe(plugins.rev.manifest({ path: config.dest.manifest.name }))
    .pipe(gulp.dest(config.dest.manifest.path));
});
