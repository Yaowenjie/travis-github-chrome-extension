import gulp from 'gulp';
import zip from 'gulp-zip';
import flatten from 'gulp-flatten';
import babel from 'gulp-babel';
import watch from 'gulp-watch';

const DIST_PATH = "dist";
const DEST_PATH = "builds";

gulp.task("default", ["babel-transform"], () => {
  return gulp.src(["src/img/*", "src/js/lib/*", "src/*"], {base: "."})
    .pipe(flatten())
    .pipe(gulp.dest(DIST_PATH));
});

gulp.task("babel-transform", () => {
  return watch('src/js/*.js', () => {
    gulp.src(["src/js/*.js"], {base: "."})
      .pipe(babel())
      .pipe(flatten())
      .pipe(gulp.dest(DIST_PATH));
  });
});

gulp.task("build", () => {
  return gulp.src(["src/**/*"], {base: "."})
    .pipe(flatten())
    .pipe(zip(`github-travis-chrome-extension.zip`))
    .pipe(gulp.dest(DEST_PATH));
});