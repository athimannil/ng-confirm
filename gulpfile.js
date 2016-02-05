var gulp = require('gulp'),
    bower = require('gulp-bower'),
	flatten = require('gulp-flatten'),
	// uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    // concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    notify = require("gulp-notify"),
	prefixer = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload');

/* One time task start */
var config = {
	// sassDir: './resources/sass',
	jsPath: './resources/scripts',
	// fontDir: './resources/fonts',
	// imageDir: './resources/images',
	bowerDir: './bower_components'
};
// Install bower
gulp.task('bower', function() {
	return bower();
});
gulp.task('bowerFiles', function() {
    return gulp.src('bower_components/**/*.min.js')
        .pipe(flatten())
        .pipe(gulp.dest('./public/js'));
});
gulp.task('files', function() {
    return gulp.src([
	    	'resources/**.html'
    	])
        .pipe(gulp.dest('./public'))
		.pipe(livereload());
});
gulp.task('connect', function() {
	connect.server({
		root: 'public',
		port: 8000,
		livereload: true
	});
});
/* One time task end */
gulp.task('styles', function() {
	return gulp.src(config.bowerDir+'/bootstrap-sass/assets/stylesheets/_bootstrap.scss')
		.pipe(sass())
		.on("error", notify.onError(function (error) {
			return "Error: " + error.message;
		}))
		.pipe(prefixer({
            browsers: ['last 15 versions'],
            cascade: false
		}))
		.pipe(gulp.dest('./public/css'))
		.pipe(livereload());
});
gulp.task('scripts', function(){
	gulp.src(config.jsPath + '/*.js')
		.on("error", notify.onError(function (error) {
			return "Error: " + error.message;
		}))
		// .pipe(concat('core.js'))
		// .pipe(uglify())
		.pipe(gulp .dest('./public/js'))
		.pipe(livereload());
});
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('resources/**.html', ['files']);
	gulp.watch(config.jsPath + '/*.js', ['scripts']);
	gulp.watch(config.sassDir + '/*.scss', ['styles']);
});

gulp.task('install', ['files', 'bower', 'bowerFiles']);
gulp.task('default', ['scripts', 'styles', 'watch', 'connect']);

