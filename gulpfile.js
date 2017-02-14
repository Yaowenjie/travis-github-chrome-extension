var gulp = require("gulp"),
    zip = require("gulp-zip"),
    flatten = require('gulp-flatten');

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
