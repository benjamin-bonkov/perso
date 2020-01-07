// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint')
,	concat = require('gulp-concat')
,	uglify = require('gulp-uglify')
,	rename = require('gulp-rename')
,	concatCss = require('gulp-concat-css')
,	minifyCSS = require('gulp-minify-css')
// ,	imagemin = require('gulp-imagemin')
,	cache = require('gulp-cache');

// Lint Task
gulp.task('lint', function() {
	return gulp.src('public/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	return gulp.src('../public/js/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('../public/dist/js'))
		.pipe(rename('all.min.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('../public/dist/js'));
});

// Concatenate & Minify CSS
gulp.task('css', function () {
	return gulp.src('../public/css/**/*.css')
		.pipe(concatCss("css/style.css"))
		.pipe(gulp.dest('../public/dist/'))
		.pipe(rename("/css/style.min.css"))
		.pipe(minifyCSS({}))
		.pipe(gulp.dest('../public/dist/'));
});

// gulp.task('images', function() {
//   return gulp.src('../public/images/**/*')
//     .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
//     .pipe(gulp.dest('../public/dist/images'));
// });

// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch('../public/js/**/*.js', ['lint', 'scripts']);
	gulp.watch('../public/css/**/*.css', ['css']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'css', /*'images',*/ 'watch']);
//en cas de pb de cache (notament si on déplace le gulp)
gulp.task('clear', function (done) {
    return cache.clearAll(done);
});