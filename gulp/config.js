var src               = 'app';
var build             = 'build';
var development       = 'build/development';
var production        = 'build/production';
var srcAssets         = 'app/_assets';
var developmentAssets = 'build/development';
var productionAssets  = 'build/production';

module.exports = {
  browsersync: {
    development: {
      files: [
        developmentAssets + '/css/*.css',
        developmentAssets + '/js/*.js',
        developmentAssets + '/images/**',
        developmentAssets + '/fonts/*'
      ],
      options: {
        //watchTask: true,
        proxy: 'dev.ag'
      }
    },
    production: {
      files: [
        productionAssets + '/css/*.css',
        productionAssets + '/js/*.js',
        productionAssets + '/images/**',
        productionAssets + '/fonts/*'
      ],
      options: {
        watchTask: true,
        proxy: 'ag'
      }
    }
  },
  delete: {
    src: [developmentAssets + '/*'],
    srcprod: [productionAssets + '/*'],
  },
  sass: {
    src:  srcAssets + '/scss/',
    dest: developmentAssets + '/css',
    destprod: productionAssets + '/css',
    options: {
      noCache: true,
      compass: false,
      sourcemap: true
    }
  },
  js: {
    src: srcAssets + '/js',
    dest: developmentAssets + '/js',
    destprod: productionAssets + '/js',
    template: {
      root: '/js/',
      filename: 'templates.js',
      standalone: true,
      templateHeader: '(function(){angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {',
      templateFooter: '}]);})();'
    }
  },
  images: {
    src: srcAssets + '/images',
    dest: developmentAssets + '/images',
    destprod: productionAssets + '/images',
  },
  bower: {
    css: '**/*.css'
  },
  autoprefixer: {
    browsers: [
      'last 2 versions',
      'safari 5',
      'ie 8',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4'
    ],
    cascade: true
  },
  base64: {
    src: developmentAssets + '/css/*.css',
    dest: developmentAssets + '/css',
    options: {
      //baseDir: build,
      extensions: ['png'],
      maxImageSize: 20 * 1024, // bytes
      debug: false
    }
  },
  watch: {
    sass:    srcAssets + '/scss/*.scss',
    scripts: srcAssets + '/**/*.js',
    images:  srcAssets + '/images/**/*',
    sprites: srcAssets + '/images/**/*.png',
    templates: srcAssets + '/js/**/*.tpl.html',
    copyhtml: src + '/*.html',
    copyfonts: srcAssets + '/**/fonts/*',
    svg:     'vectors/*.svg'
  },
  scsslint: {
    src: [
      srcAssets + '/scss/**/*.{sass,scss}',
      '!' + srcAssets + '/scss/base/_sprites.scss',
      '!' + srcAssets + '/scss/helpers/_meyer-reset.scss'
      ],
      options: {
        bundleExec: true
      }
  },
  jshint: {
    src: srcAssets + '/javascripts/*.js'
  },
  optimize: {
    css: {
      src:  [
        developmentAssets + '/css/!(ag|lumx)*.css',
        developmentAssets + '/css/ag.css'
      ],
      dest: productionAssets + '/css/',
      options: {
        keepSpecialComments: 0
      }
    },
    js: {
      src:  [
        developmentAssets + '/js/libs/jquery.js',
        developmentAssets + '/js/libs/angular.js',
        developmentAssets + '/js/libs/!(lumx)*.js',
        developmentAssets + '/js/libs/lumx.js',
        developmentAssets + '/js/!(app)*.js',
        developmentAssets + '/js/app.js'
      ],
      dest: productionAssets + '/js/',
      options: {}
    },
    images: {
      src:  developmentAssets + '/images/**/*.{jpg,jpeg,png,gif}',
      dest: productionAssets + '/images/',
      options: {
        optimizationLevel: 3,
        progessive: true,
        interlaced: true
      }
    },
    html: {
      src: production + '/**/*.html',
      dest: production,
      options: {
        collapseWhitespace: true
      }
    }
  },
  copyfonts: {
    src: [srcAssets + '/**/fonts/**/*.{eot,svg,ttf,woff,woff2}', srcAssets + '/**/fonts/*.{eot,svg,ttf,woff,woff2}'],
    dest: developmentAssets + '/fonts/',
    destprod: productionAssets + '/fonts/'
  },
  copyhtml: {
    src: src + '/*.html',
    dest: developmentAssets + '/',
    destprod: productionAssets + '/'
  },
  revision: {
    src: {
      assets: [
        productionAssets + '/css/*.min.css',
        productionAssets + '/js/*.min.js',
        productionAssets + '/images/**/*'
      ],
      base: production
    },
    dest: {
      assets: production,
      manifest: {
        name: 'manifest.json',
        path: productionAssets
      }
    }
  },
  collect: {
    src: [
      productionAssets + '/manifest.json',
      production + '/**/*.{html,xml,txt,json,css,js}',
      '!' + production + '/feed.xml'
    ],
    dest: production
  },
  gzip: {
    src: production + '/**/*.{html,xml,json,css,js}',
    dest: production,
    options: {}
  },
  webp: {
    src: productionAssets + '/images/**/*.{jpg,jpeg,png}',
    dest: productionAssets + '/images/',
    options: {}
  }
};
