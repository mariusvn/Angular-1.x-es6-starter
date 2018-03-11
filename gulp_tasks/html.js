'use strict';

var gulp = require('gulp');
var del = require('del');
var inject = require('gulp-inject');


// ======== BUILD VIEWS / ASSETS / FONTS
gulp.task('copyHTML', function () {
  return gulp.src([ 'src/views/**/*.html',
                    'src/assets/**/*',
                    'src/fonts/**/*'
                  ], {
                    base: 'src'
                  }).pipe(gulp.dest('public'));
});

gulp.task('injectHTML', ['copyHTML'], function () {
  gulp.src('src/index.html')
      .pipe(inject(gulp.src('public/js/libs*.js', {read: false}), {
        name: 'head',
        ignorePath: 'public'
      }))
      .pipe(inject(gulp.src([
      'public/css/*.css',
      'public/js/bundle*.js',
      '!public/js/libs*.js'
    ], {
      read: false
    }), {
      ignorePath: 'public'
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('cleanHTML', function () {
  return del.sync([ 'public/views/**/*',
                    'public/fonts/**/*',
                    'public/assets/**/*']);
});

// ============== Init Task Dev
gulp.task('html:watch',['cleanHTML', 'injectHTML'], function () { gulp.watch('./src/**/*.html', ['cleanHTML', 'injectHTML']) });

// ============== Init Task Prod
gulp.task('html:prod',['cleanHTML', 'injectHTML']);
