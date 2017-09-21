// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint')
,	concat = require('gulp-concat')
,	uglify = require('gulp-uglify')
,	rename = require('gulp-rename')
,	autoprefixer = require('gulp-autoprefixer')
,	concatCss = require('gulp-concat-css')
,   cleanCSS = require('gulp-clean-css')
,	imagemin = require('gulp-imagemin')
,	cache = require('gulp-cache')
,   less = require('gulp-less')
,   plumber = require('gulp-plumber')
,   notify = require('gulp-notify');

var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'Gulp',
        message: 'Error: <%= error.message %>'
      })
};

var paths = {
	scripts: [
		'../public/js/libs/jquery-3.2.1.min.js',
		'../public/js/plugins/jquery.tablesorter.min.js',
		'../public/js/material-form.js',
		'../public/js/scroll-anchor.js',
		'../public/js/popin.js',
		'../public/js/header.js',
		'../public/js/script.js',
		'../public/js/tables.js'
	],
    stylesWatchDir: [
        '../public/less/**'
    ],
	styles: [
		'../public/less/styles.less'
	],
	dest:"../public/dist",
	images:"../public/images"
};

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
		.pipe(uglify({ mangle: false }))
		.pipe(gulp.dest(paths.dest+'/js'));
});

// Concatenate & Minify CSS
gulp.task('css', function () {
	return gulp.src(paths.styles)
        .pipe(plumber(plumberErrorHandler))
        .pipe(less())
		.pipe(concatCss("css/style.css"))
		.pipe(gulp.dest(paths.dest+'/'))
		.pipe(rename("/css/style.min.css"))
		.pipe(cleanCSS({}))
        .pipe(autoprefixer({browsers: ['last 3 versions']}))
		.pipe(gulp.dest(paths.dest+'/'));
});

// Concatenate CSS
gulp.task('css-dev', function () {
	return gulp.src(paths.styles)
        .pipe(plumber(plumberErrorHandler))
        .pipe(less())
		.pipe(concatCss("css/style.css"))
		.pipe(gulp.dest(paths.dest+'/'))
		.pipe(rename("/css/style.min.css"))
		.pipe(cleanCSS({}))
        .pipe(autoprefixer({browsers: ['last 3 versions']}))
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
	gulp.watch(paths.stylesWatchDir, ['css']);
    gulp.watch(paths.images+'/**/*', ['images']);
});
// Watch Files For Changes
gulp.task('watch-dev', function() {
	gulp.watch(paths.scripts, ['scripts-dev']);
	gulp.watch(paths.stylesWatchDir, ['css-dev']);
    gulp.watch(paths.images+'/**/*', ['images']);
});

// Clear cache
gulp.task('clear', function(){
    cache.clearAll();
});

// Default Task
gulp.task('default', ['scripts', 'css', 'images', 'watch']);
// dev Task
gulp.task('dev', ['scripts-dev', 'css-dev', 'images', 'watch-dev']);

gulp.task('delivery', ['scripts', 'css']);