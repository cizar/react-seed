'use strict';

var gulp        = require('gulp'),
    runSequence = require('run-sequence'),
    del         = require('del'),
    browserify  = require('gulp-browserify'),
    less        = require('gulp-less'),
    connect     = require('gulp-connect');

var sources = {
  scripts: 'src/js/app.js',
  styles: 'src/less/main.less',
  assets: 'src/**/*.html'
};

gulp.task('clean', function(done) {
  del('dist', done);
});

gulp.task('build-scripts', function() {
  return gulp.src(sources.scripts)
    .pipe(browserify({
      debug: true,
      transform: ['reactify']
    }))
    .pipe(gulp.dest('dist/js/'))
    .pipe(connect.reload());
});

gulp.task('build-styles', function() {
  return gulp.src(sources.styles)
    .pipe(less())
    .pipe(gulp.dest('dist/css/'))
    .pipe(connect.reload());
});

gulp.task('build-assets', function() {
  return gulp.src(sources.assets)
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

gulp.task('build', function(done) {
  runSequence('clean', ['build-scripts', 'build-styles'], 'build-assets', done);
});

gulp.task('serve', function() {
  connect.server({
    root: 'dist/',
    livereload: true,
    port: process.env.PORT
  });
});

gulp.task('watch', function() {
  gulp.watch(sources.scripts, ['build-script']);
  gulp.watch(sources.styles, ['build-styles']);
  gulp.watch(sources.assets, ['build-assets']);
});

gulp.task('default', ['build'], function() {
  runSequence('serve', 'watch');
});
