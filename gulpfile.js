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

var destination = 'dist';

gulp.task('clean', function(done) {
  del(destination, done);
});

gulp.task('build-scripts', function() {
  return gulp.src(sources.scripts)
    .pipe(browserify({
      debug: true,
      transform: ['reactify']
    }))
    .pipe(gulp.dest(destination + '/js'))
    .pipe(connect.reload());
});

gulp.task('build-styles', function() {
  return gulp.src(sources.styles)
    .pipe(less())
    .pipe(gulp.dest(destination + '/css'))
    .pipe(connect.reload());
});

gulp.task('build-assets', function() {
  return gulp.src(sources.assets)
    .pipe(gulp.dest(destination))
    .pipe(connect.reload());
});

gulp.task('build', function(done) {
  runSequence('clean', ['build-scripts', 'build-styles'], 'build-assets', done);
});

gulp.task('serve', function() {
  connect.server({
    root: destination,
    livereload: true,
    port: process.env.PORT
  });
});

gulp.task('watch', function() {
  gulp.watch(sources.scripts, ['build-scripts']);
  gulp.watch(sources.styles, ['build-styles']);
  gulp.watch(sources.assets, ['build-assets']);
});

gulp.task('default', ['build'], function() {
  runSequence('serve', 'watch');
});
