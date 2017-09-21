// Requis
var gulp = require('gulp');

// Include plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var plumber = require('gulp-plumber'); 
var notify = require('gulp-notify');
var nunjucksRender = require('gulp-nunjucks-render');
var less = require('gulp-less');

var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'Gulp',
        message: 'Error: <%= error.message %>'
    })
};

var paths = {
    scripts: [
        '../public/js/libs/jquery-1.12.0.min.js',
        '../public/js/script.js'
    ],
    styles: [
        '../public/css/reset.css',
        '../public/css/style.css'
    ],
    nunjucksPages:'../sources/pages/**/*.+(html|nunjucks)',
    nunjucksTemplates:'../sources/templates',
    nunjucksDest:'..',
    dest:"../public/dist",
    images:"../public/images"
};

// html templating
gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src(paths.nunjucksPages)
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: [paths.nunjucksTemplates]
    }))
  // output files in app folder
  .pipe(gulp.dest(paths.nunjucksDest))
});

// Lint Task
gulp.task('lint', function() {
  return gulp.src(paths.scripts)
        .pipe(plumber(plumberErrorHandler))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
        .pipe(plumber(plumberErrorHandler))
    .pipe(concat('all.js'))
    .pipe(gulp.dest(paths.dest+'/js'))
    .pipe(rename('all.min.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest(paths.dest+'/js'));
});
// Concatenate JS
gulp.task('scripts-dev', function() {
  return gulp.src(paths.scripts)
        .pipe(plumber(plumberErrorHandler))
    .pipe(concat('all.js'))
    .pipe(gulp.dest(paths.dest+'/js'))
    .pipe(rename('all.min.js'))
    // .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest(paths.dest+'/js'));
});

// Concatenate & Minify CSS
gulp.task('css', function () {
  return gulp.src(paths.styles)
        .pipe(plumber(plumberErrorHandler))
    .pipe(concatCss("css/style.css"))
    .pipe(gulp.dest(paths.dest+'/'))
    .pipe(rename("/css/style.min.css"))
    .pipe(cleanCSS({}))
        .pipe(autoprefixer({browsers: ['last 4 versions']}))
    .pipe(gulp.dest(paths.dest+'/'));
});

// Concatenate CSS
gulp.task('css-dev', function () {
  return gulp.src(paths.styles)
        .pipe(plumber(plumberErrorHandler))
    .pipe(concatCss("css/style.css"))
    .pipe(gulp.dest(paths.dest+'/'))
    .pipe(rename("/css/style.min.css"))
    // .pipe(cleanCSS({}))
        .pipe(autoprefixer({browsers: ['last 4 versions']}))
    .pipe(gulp.dest(paths.dest+'/'));
});


gulp.task('images', function() {
    return gulp.src(paths.images+'/**/*')
        .pipe(plumber(plumberErrorHandler))
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest(paths.dest+'/images'));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['css']);
    gulp.watch(paths.nunjucksPages, ['nunjucks']);
    gulp.watch(paths.nunjucksTemplates+"/**", ['nunjucks']);
});
// Watch Files For Changes
gulp.task('watch-dev', function() {
    gulp.watch(paths.scripts, ['scripts-dev']);
    gulp.watch(paths.styles, ['css-dev']);
    gulp.watch(paths.nunjucksPages, ['nunjucks']);
    gulp.watch(paths.nunjucksTemplates+"/**", ['nunjucks']);
});

// Clear cache
gulp.task('clear', function(){
    cache.clearAll();
});

// Default Task
gulp.task('default', ['scripts', 'css', 'nunjucks', 'images', 'watch']);
// dev Task
gulp.task('dev', ['scripts-dev', 'css-dev', 'nunjucks', 'images', 'watch-dev']);

gulp.task('delivery', ['scripts', 'css']);