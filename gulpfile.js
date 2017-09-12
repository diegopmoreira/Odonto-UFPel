var gulp = require('gulp');
var sass = require('gulp-sass');
var pref = require('gulp-autoprefixer');

gulp.task('compilesass', function() {
  gulp.src('./css/sass/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(pref({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('w_compilesass', function() {
  gulp.watch('./css/sass/*.scss', ['compilesass']);
});

gulp.task('default', ['w_compilesass']);
