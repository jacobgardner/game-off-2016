import gulp from 'gulp';
import browserify from 'browserify';
import rollupify from 'rollupify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import browserSyncCreate from 'browser-sync';
import ghPages from 'gulp-gh-pages';

import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';

const postcssProcessors = [postcssImport, autoprefixer];

const browserSync = browserSyncCreate.create();

const SOURCE_FILES = './src/**/*.js';
const CSS_FILES = './css/**/*.css';

gulp.task('js', () => {
    const b = browserify({
        entries: './src/main.js',
        debug: true,
        transform: [rollupify, babelify],
    });

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('css', () => {
    return gulp.src('./css/main.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(postcssProcessors))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('js-watch', ['js'], () => {
    gulp.watch(SOURCE_FILES, ['js', () => {
        browserSync.reload();
    }]);
});

gulp.task('css-watch', ['css'], () => {
    gulp.watch(CSS_FILES, ['css']);
});

gulp.task('watch', ['js-watch', 'css-watch']);

gulp.task('publish', () => {
    gulp.src(['./dist/**/*', './index.html'], {base: '.'})
        .pipe(ghPages());
});

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './',
        },
    });
});

gulp.task('default', ['watch', 'serve']);