import gulp from 'gulp';
import zip from 'gulp-zip';
import flatten from 'gulp-flatten';

const DIST_PATH = "dist";
const DEST_PATH = "builds";

gulp.task("default", () => {
  return gulp.src(["src/**/*"], {base: "."})
    .pipe(flatten())
    .pipe(gulp.dest(DIST_PATH));
});

gulp.task("build", () => {
  return gulp.src(["src/**/*"], {base: "."})
    .pipe(flatten())
    .pipe(zip(`github-travis-chrome-extension.zip`))
    .pipe(gulp.dest(DEST_PATH));
});
