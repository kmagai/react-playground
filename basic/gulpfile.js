var gulp = require('gulp');
var reactify = require('reactify');
var using = require('gulp-using');
var webserver = require('gulp-webserver');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            open: true,
            port: 9000
        }));
});

gulp.task('browserify', function() {
    gulp.task('browserify', function() {
        var b = browserify({
            entries: ['./src/main.js'],
            transform: [reactify]
        });
        return b.pipe(plumber())
            .bundle()
            .pipe(source('app.js'))
            .pipe(gulp.dest('./dist'));
    });
});
gulp.task('watch', ['webserver'], function() {
    gulp.watch(['./src/*'], ['browserify']);
});
