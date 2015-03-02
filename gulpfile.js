'use strict';

var gulp        = require('gulp'),
    runSequence = require('run-sequence'),
    del         = require('del'),
    browserify  = require('gulp-browserify'),
    less        = require('gulp-less'),
    connect     = require('gulp-connect');

gulp.task('clean', function(done) {
  del('dist', done);
});

gulp.task('build-styles', function() {
  return gulp.src('src/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css/'))
    .pipe(connect.reload());
});

gulp.task('build-scripts', function() {
  return gulp.src(['src/js/app.js'])
    .pipe(browserify({
      debug: true,
      transform: ['reactify']
    }))
    .pipe(gulp.dest('dist/js/'))
    .pipe(connect.reload());
});

gulp.task('build-assets', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

gulp.task('build', function(done) {
  runSequence('clean', ['build-styles', 'build-scripts'], 'build-assets', done);
});

gulp.task('serve', function() {
  connect.server({
    root: 'dist/',
    livereload: true,
    port: process.env.PORT
  });
});

gulp.task('watch', function () {
  gulp.watch(['src/**'], ['build']);
});

gulp.task('default', ['build'], function() {
  runSequence('serve', 'watch');
});
