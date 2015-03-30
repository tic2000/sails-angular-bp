var gulp   = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    config = require('../../config').optimize.js;

/**
 * Copy and minimize JS files
 */
gulp.task('optimize:js', function() {
  gulp.src(config.src)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('ag.js'))
    .pipe(plugins.size({title: 'ag.js'}))
    .pipe(plugins.uglify(config.options))
    .pipe(plugins.rename('ag.min.js'))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(config.dest))
    .pipe(plugins.size({title: 'ag.min.js'}));
});
