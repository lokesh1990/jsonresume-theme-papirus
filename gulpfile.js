'use strict'

const gulp = require('gulp')
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');

gulp.task('buildcss', function() {
  var files = [
    "css/resume.css",
    "css/sidebar.css",
    "css/education.css",
    "css/content.css",
    "css/summary.css",
    "css/work.css",
    "css/trainings.css",
    "css/skills.css",
    "css/contact.css",
    "css/media.css"];
  return gulp.src(files)
    .pipe(minifyCSS())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./'));
})
