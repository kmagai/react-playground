var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var source = require("vinyl-source-stream");
var browserify = require('browserify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');

var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');

gulp.task('browserify', function() {
    var bundler = browserify('./src/main.js', {
        debug: true
    });
    return bundler
        .transform(reactify)
        .bundle()
        .pipe(plumber())
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./public/javascripts'));
});

gulp.task('webserver', function() {
    gulp.src('./public/')
        .pipe(webserver({
            livereload: true,
            open: true,
            port: 3000
        }));
});

gulp.task('watch', ['webserver'], function() {
    gulp.watch(['./src/*'], ['browserify']);
});
