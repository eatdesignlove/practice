'use strict';

// 의존 모듈 로드
var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// 기본 업무 등록
gulp.task('default', [
  'compile:css', 
  'optimize:img',
  'watch'
]);

// Watch
gulp.task('watch', function(){
  gulp.watch('./src/**/*.{sass,scss}', ['compile:css']);
});

// Compile:css
gulp.task('compile:css', function(){
  return gulp.src('./src/_sass/*.{sass, scss}')
             .pipe(sass().on('error', sass.logError))
             .pipe(gulp.dest('./dist/css'));
});

// Optimize:img
gulp.task('optimize:img', function(){
  return gulp.src('./src/assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/assets/img'))
})
