import gulp from 'gulp';
import browserify from 'browserify';
import rollupify from 'rollupify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';

const SOURCE_FILES = './src/**/*.js';

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
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['js']);