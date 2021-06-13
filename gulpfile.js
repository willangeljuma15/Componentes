const { src, dest, task, series, watch } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

task('sassFiles', () => {
    return src([
        './node_modules/bootstrap/scss/bootstrap.scss',
        './node_modules/bootstrap-icons/font/bootstrap-icons.css',
        './src/assets/scss/main.scss'
    ])
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            versions: ['last 2 browsers']
        }))
        .pipe(dest('src/dist/css'))
});


task('imagemin', () => {
    return src('./src/assets/img/**/*')
            .pipe(imagemin())
            .pipe(dest('./src/dist/img'));
});

task('fonts', () => {
    return src('./node_modules/bootstrap-icons/font/fonts/*')
        .pipe(dest('./src/dist/css/fonts'));
});

task('javascript', () => {
    return src('./src/assets/js/**/*.js')
        .pipe(babel())
        .pipe(concat('bundle.js'))
        .pipe(dest('./src/dist/js'));
});


task('watchArcivos', () => {
    watch('./src/assets/scss/**/*.scss', series('sassFiles'));
    watch('./src/views/**/*.js', series('javascript')); 
});

task('default', series('sassFiles', 'javascript', 'imagemin', 'fonts', 'watchArcivos'));

