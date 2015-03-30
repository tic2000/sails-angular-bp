var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
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

/**
 * Generate CSS from SCSS
 * Build sourcemaps
 */
gulp.task('sass:build', function() {
  var sassConfig = config.sass.options;

  // Don’t write sourcemaps of sourcemaps
  var filter = plugins.filter(['*.css', '!*.map']);

  browserSync.notify('Compiling Sass');

  return plugins.rubySass(config.sass.src, sassConfig)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.autoprefixer(config.autoprefixer))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(config.sass.dest));
});

gulp.task('sass', ['styles:libs', 'sass:build']);
