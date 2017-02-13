var gulp = require("gulp"),
    zip = require("gulp-zip");

const DEST_PATH = "builds";

gulp.task("build", () => {
  return gulp.src(["src/*"],
    {base: "."})
    .pipe(zip(`github-travis-chrome-extension.zip`))
    .pipe(gulp.dest(DEST_PATH))
});
