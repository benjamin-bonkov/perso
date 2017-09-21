/*
*** Install ***
* Install via command : `npm install`
* Then you can uses the Tasks :
* - `gulp dev` -> on local (does not minify css and js) + watch
* - `gulp delivery` -> same + minify css/js
* - `gulp clear` -> clear cache
* - `gulp images` -> minify images
* 
*** Updating dependencies ***
* Install globally the npm-check-updates package via : `npm i -g npm-check-updates`
* then in you gulp folder in your project you can check for dependencies update :
* first you check for updates, then you install them.
* - `npm-check-updates -u`
* - `npm install`
*
*** .gitignore dist ***
* Files generated goes in /public/dist/.
* A .gitignore files should be in the /dist/ folder and should ignore : /css/ & /js/
* Do not ignore /images/ folder since it won't be generated through the deploy
*
*** Autoprefixer ***
* There's also the autoprefixer package which automatically adds vendor prefixes on your css rules.
* github link : https://github.com/postcss/autoprefixer
* It uses browserslist param which takes different queries. You can find some of them here : https://github.com/ai/browserslist#queries
* And you can test your queries here : http://browserl.ist/
* 
*/


// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint')
,	concat = require('gulp-concat')
,	uglify = require('gulp-uglify')
,	rename = require('gulp-rename')
,	autoprefixer = require('gulp-autoprefixer')
,	concatCss = require('gulp-concat-css')
,	cleanCSS = require('gulp-clean-css')
,	imagemin = require('gulp-imagemin')
,	cache = require('gulp-cache');
var plumber = require('gulp-plumber'); 
var notify = require('gulp-notify');

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
    gulp.watch(paths.images+'/**/*', ['images']);
});
// Watch Files For Changes
gulp.task('watch-dev', function() {
	gulp.watch(paths.scripts, ['scripts-dev']);
	gulp.watch(paths.styles, ['css-dev']);
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