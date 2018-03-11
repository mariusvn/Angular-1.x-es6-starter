'use strict';

var gulp = require('gulp');
var libs = require('./libs.js');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var del = require('del');

// ============== TASK JS
gulp.task('babel', function () {
  return gulp.src('./src/**/*.js')
                  .pipe(concat('bundle_' + new Date().getTime() + '.min.js'))
                  .pipe(babel({ presets: ['env'] }))
                  .pipe(gulp.dest('./public/js'));
});
gulp.task('libs', function () {
  return gulp.src(libs.js)
                  .pipe(concat('libs_' + new Date().getTime() + '.min.js'))
                  .pipe(gulp.dest('./public/js'));
});
gulp.task('injectJS', ['babel', 'libs'], function () {
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

gulp.task('cleanJS', function () { return del.sync(['public/js']) });


// ============== Init Task Dev
gulp.task('babel:watch', ['cleanJS', 'injectJS'], function () { gulp.watch('./src/**/*.js', ['cleanJS', 'injectJS']) });

// ============== Init Task Prod
gulp.task('babel:prod', ['cleanJS', 'injectJS']);
