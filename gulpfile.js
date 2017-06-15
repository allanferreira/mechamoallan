const gulp         = require('gulp')
    , htmlmin      = require('gulp-htmlmin')
    , inlinesource = require('gulp-inline-source')
	, stylus       = require('gulp-stylus')
	, plumber      = require('gulp-plumber')
	, browserify   = require('gulp-browserify')


gulp.task('html', function () {
    return gulp.src('./src/*.html')
        .pipe(plumber())
        .pipe(inlinesource())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(plumber.stop())
        .pipe(gulp.dest('dist'))
})

gulp.task('stylus', () => {
	return gulp.src('./src/css/*.styl')
		.pipe(plumber())
		.pipe(stylus({
			'include css': true,
		  	compress: true
		}))
		.pipe(plumber.stop())
		.pipe(gulp.dest('./dist/css'))
})

gulp.task('appjs', () => {
    return gulp.src('./src/js/app.js')
		.pipe(plumber())
        .pipe(browserify())
		.pipe(plumber.stop())
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('js', () => {
    return gulp.src(['!./src/js/app.js','./src/js/*.js'])
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('watch', () => {
    console.log('Listener changes in files...')
    gulp.watch('./src/**/*.html', ['html'])
    gulp.watch('./src/css/**/*.styl', ['stylus'])
    gulp.watch('./src/js/**/*.js', ['js','appjs'])
})

gulp.task('build', ['stylus','js'])
gulp.task('default', ['build'])
