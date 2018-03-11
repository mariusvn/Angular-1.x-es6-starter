'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
requireDir('./gulp_tasks');

// ============== Init Task Dev
gulp.task('default', ['sass:watch','html:watch','babel:watch'], function () {
  // configure nodemon
  var stream = nodemon({
    // the script to run the app
    script: 'server.js',
    ext: 'js',
    ignore: ['src', 'public', 'gulpfile.js']
  });
  stream
    .on('restart', function () {
      console.log('nodemon started!');
    })
    .on('crash', function () {
      console.error('Application has crashed!\n');
      stream.emit('restart', 10); // restart the server in 10 seconds
    });
});

// ============== Init Task Prod
gulp.task('prod', ['sass:prod','html:prod','babel:prod']);

// ============== Listing all tasks
gulp.task('help', function () {
  console.log('\n===============================================\n',
    gutil.colors.cyan('Gulpfile - Tasks Index') + '\n ----------------------',
    '\n • ' + gutil.colors.yellow('gulp') + '          > build dev ' + gutil.colors.yellow('(debug usage only)'),
    '\n • ' + gutil.colors.green('gulp prod') + '     > build prod',
    '\n===============================================\n'
  );
});
