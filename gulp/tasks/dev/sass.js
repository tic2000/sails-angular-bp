var gulp         = require('gulp'),
    browsersync  = require('browser-sync'),
    sourcemaps   = require('gulp-sourcemaps'),
    config       = require('../../config'),
    bowerFiles = require('main-bower-files'),
    plugins = require('gulp-load-plugins')();

gulp.task('styles:libs', function() {
  var filter = plugins.filter(['*.css', '!*.min.css']);
  return gulp.src(bowerFiles(config.bower.css))
  .pipe(plugins.plumber())
  .pipe(filter)
  //.pipe(plugins.replace(/..\/fonts/g, '../../fonts'))
  .pipe(gulp.dest(config.sass.dest));
});

gulp.task('scss:lint', function() {
  return gulp.src(config.sass.src)
    .pipe(plugins.plumber())
    .pipe(plugins.scssLint());
});

/**
 * Generate CSS from SCSS
 * Build sourcemaps
 */
gulp.task('sass:build', function() {
  var sassConfig = config.sass.options;

  sassConfig.onError = browsersync.notify;

  // Don’t write sourcemaps of sourcemaps
  var filter = plugins.filter(['*.css', '!*.map']);

  browsersync.notify('Compiling Sass');

  return plugins.rubySass(config.sass.src, sassConfig)
    .pipe(plugins.plumber())
    //.pipe(sourcemaps.init())
    .pipe(plugins.autoprefixer(config.autoprefixer))
    .pipe(filter) // Don’t write sourcemaps of sourcemaps
    //.pipe(sourcemaps.write('.', { includeContent: false }))
    .pipe(filter.restore()) // Restore original files
    .pipe(gulp.dest(config.sass.dest));
});

gulp.task('sass', ['styles:libs', 'sass:build']);
