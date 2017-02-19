import gulp from 'gulp';
import zip from 'gulp-zip';
import flatten from 'gulp-flatten';
import clean from 'gulp-clean';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import runSequence from 'run-sequence';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';
import gp_uglify from 'gulp-uglify';

const DIST_PATH = 'dist';
const DEST_PATH = 'build';

gulp.task('default', ['clean'], () => {
  gulp.start('copy', 'bundle')
});

gulp.task('watch', ['default'], () => {
  gulp.watch('src/**/*.js', ['lint', 'bundle']);
  gulp.watch('test/**/*.js', ['lint', 'test']);
  gulp.watch(["src/imgs/*", "src/*.json"], ['copy']);
});

gulp.task('build', () => {
  runSequence('clean', 'copy', 'bundle', () => {
    gulp.src([`${DIST_PATH}/*`], {base: "."})
      .pipe(flatten())
      .pipe(zip(`github-travis-chrome-extension.zip`))
      .pipe(gulp.dest(DEST_PATH));
  });
});

gulp.task('bundle', () => {
  return browserify({
      entries: 'src/index.js'
    })
    .transform(babelify.configure({
      ignore: ['src/js/lib/']
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gp_uglify())
    .pipe(gulp.dest(DIST_PATH));
});

gulp.task('copy', () => {
  return gulp.src(["src/imgs/*", "src/*.json"], {base: "."})
    .pipe(flatten())
    .pipe(gulp.dest(DIST_PATH));
});

gulp.task('test', () => {
  return gulp.src(["test/**/*.js"])
    .pipe(mocha({
      compilers: {
        js: 'babel-core/register'
      }
    }));
});

gulp.task('clean', () => {
  return gulp.src(DIST_PATH, {read: false})
    .pipe(clean());
});

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js', '!src/js/lib/*.js', 'test/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});
