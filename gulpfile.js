var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    webpack = require('gulp-webpack'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    webpackConfig = require('./webpack.config.js'),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    precss = require("precss");

gulp.task('lint', function  () {
    gulp.src(['./src/js/**/*.js','./src/js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('css', function () {
    var processors = [
        precss,
        autoprefixer({browers:['last 2 versions']})
        
    ];
    return gulp.src('src/css/index.css')
        .pipe(postcss(processors))
        .pipe(rename('uiKit.css'))
        .pipe(gulp.dest('dist/'));
})
gulp.task('dist', function () {
    gulp.src('./src/js/index.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./dist/'))
        .pipe(rename('uiKit.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
})

gulp.task('default', ['lint','dist','css']);