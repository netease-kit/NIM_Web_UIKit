var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    webpack = require('gulp-webpack'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    webpackConfig = require('./webpack.config.js');

gulp.task('lint', function  () {
    gulp.src(['./src/js/**/*.js','./src/js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('dist', function () {
    gulp.src('./src/js/index.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./dist/'))
        .pipe(rename('uiKit.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
    gulp.src('./src/css/*.css')
        .pipe(concat('uiKit.css'))
        .pipe(gulp.dest('./dist'))
})

gulp.task('default', ['lint','dist']);