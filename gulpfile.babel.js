import gulp from 'gulp';
import zip from 'gulp-zip';
import flatten from 'gulp-flatten';
import babel from 'gulp-babel';
import clean from 'gulp-clean';

const DIST_PATH = "dist";
const DEST_PATH = "builds";

gulp.task('default', ['clean'], () => {
  gulp.start('copy', 'babel-transform')
});

gulp.task('watch', () => {
  gulp.watch('src/js/*.js', ['babel-transform']);
  gulp.watch(["src/imgs/*", "src/js/lib/*", "src/*"], ['copy']);
});

gulp.task('build', () => {
  return gulp.src(["src/**/*"], {base: "."})
    .pipe(flatten())
    .pipe(zip(`github-travis-chrome-extension.zip`))
    .pipe(gulp.dest(DEST_PATH));
});

gulp.task('babel-transform', () => {
  return gulp.src(["src/js/*.js"], {base: "."})
    .pipe(babel())
    .pipe(flatten())
    .pipe(gulp.dest(DIST_PATH));
});

gulp.task('copy', () => {
  return gulp.src(["src/imgs/*", "src/js/lib/*", "src/*"], {base: "."})
    .pipe(flatten())
    .pipe(gulp.dest(DIST_PATH));
});

gulp.task('clean', () => {
  return gulp.src(DIST_PATH, {read: false})
    .pipe(clean());
});
