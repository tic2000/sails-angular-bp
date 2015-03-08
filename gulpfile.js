var gulp = require('gulp'),
    requireDir = require('require-dir'),
    bowerFiles = require('main-bower-files'),
    minimist = require('minimist'),
    del = require('del'),
    plugins = require('gulp-load-plugins')();

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });

function watcherWithCache(name, src, tasks) {
  var watcher = gulp.watch(src, tasks);

  watcher.on('change', function(event) {
    if (event.type === 'deleted') {
      delete plugins.cached.caches.scripts[event.path];
      plugins.remember.forget(name, event.path);
    }
  });
}
