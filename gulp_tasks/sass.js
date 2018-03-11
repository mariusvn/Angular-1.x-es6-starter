'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var del = require('del');

// ============== TASK SASS
gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
                  .pipe(concat('bundle_' + new Date().getTime() + '.min.scss'))
                  .pipe(sass({outputStyle: 'compressed'}))
                  .pipe(gulp.dest('./public/css'));
});
gulp.task('injectCSS', ['sass'], function () {
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

gulp.task('cleanCSS', function () { return del.sync(['public/css']) });


// ============== Init Task Dev
gulp.task('sass:watch', ['cleanCSS', 'injectCSS'], function () { gulp.watch('./src/**/*.scss', ['cleanCSS', 'injectCSS']) });

// ============== Init Task Prod
gulp.task('sass:prod', ['cleanCSS', 'injectCSS']);
