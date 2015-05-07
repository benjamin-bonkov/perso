/* =======================================================================
 This file is created by Chechu Castro [chechu@digitatis.com]
 In order to use this code (or a part of it), please feel free
 to contact me.
 Website : http://www.digitatis.com
 Twitter : nexus5_com_es
 FILE NAME: gulpfile.js - Copyright (C)
======================================================================= */

// Include gulp
var gulp      = require('gulp'),
  // Include Our Plugins
  jshint      = require('gulp-jshint'),
  sass        = require('gulp-sass'),
  concat      = require('gulp-concat'),
  uglify      = require('gulp-uglify'),
  watch       = require('gulp-watch'),
  rename      = require('gulp-rename'),
  newer       = require('gulp-newer'),
  imagemin    = require('gulp-imagemin'),
  cache       = require('gulp-cache'),
  livereload  = require('gulp-livereload'),
  notify      = require('gulp-notify'),
  neat        = require('node-neat').includePaths,
  cssmin      = require('gulp-cssmin');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('../js/*.js')
          .pipe(jshint())
          .pipe(jshint.reporter('default'))
          .pipe(notify({ message: 'LINT task --> GOOD !' }));
});
// Html
gulp.task('html', function() {
    return gulp.src('../wordpress/wp-content/themes/e-merchant/static/*.php')
          //.pipe(gulp.dest('../dist/html'))
          .pipe(livereload())
          .pipe(notify({ message: 'HTML files are reloaded!' }));
});
// Compile Sass
gulp.task('sass', function() {
    return gulp.src('../sass/*.scss')
          .pipe(sass({
              includePaths: ['stylesheet'].concat(neat),
              style: 'compressed',
              errLogToConsole: false,
                onError: function(err) {
                    return notify().write(err);
                }
          }))
          .pipe(gulp.dest('../wordpress/wp-content/themes/e-merchant/css'))
          .pipe(cssmin())
          .pipe(rename({suffix: '.min'}))
          .pipe(gulp.dest('../wordpress/wp-content/themes/e-merchant/css/'))
          .pipe(livereload())
          .pipe(notify({ message: 'SASS task --> GOOD !' }));
});

// Images optimization
gulp.task('images', function() {
  return gulp.src('../wordpress/wp-content/themes/e-merchant/images/*.*')
        .pipe(newer('../wordpress/wp-content/themes/e-merchant/images/optimized/'))
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('../wordpress/wp-content/themes/e-merchant/images/optimized/'))
        .pipe(notify({ message: 'IMAGES are now optimized. Task --> GOOD !' }) );
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['../js/libs/jquery/*.js',
                     '../js/libs/plugins/modernizr.custom.js',
                     '../js/libs/plugins/pushy.js',
                     '../js/libs/plugins/skrollr.js',
                     '../js/libs/plugins/jquery.infinitecarousel3.js',
                     '../js/libs/plugins/easing.js',
                     '../js/libs/plugins/idangerous.swiper.js',
                     '../js/*.js']) //Final file concatenated with the files written above
          .pipe(concat('app.js'))
          .pipe(gulp.dest('../wordpress/wp-content/themes/e-merchant/js'))
          .pipe(rename('app.min.js'))
          .pipe(uglify())
          .pipe(livereload())
          .pipe(gulp.dest('../wordpress/wp-content/themes/e-merchant/js/'))
          .pipe(notify({ message: 'SCRIPTS task --> GOOD !' }));
});

// Watch Files For Changes
gulp.task('watch', function() {
     gulp.watch('../js/*.js', ['lint', 'scripts']);
     gulp.watch('../sass/*.scss', ['sass']);
     gulp.watch('../wordpress/wp-content/themes/e-merchant/images/*.*', ['images']);
     gulp.watch('../wordpress/wp-content/themes/e-merchant/static/*.php', ['html']);
});

// Default Task
gulp.task('default', ['watch']); // gulp

// TODO remove console.log
