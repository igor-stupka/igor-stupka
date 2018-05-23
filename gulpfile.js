var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache');
//SASS
gulp.task('sass', function() {
    return gulp.src('app/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }));
});
//Concat+Uglify
gulp.task('minscripts', function() {
    return gulp.src([
            'app/libs/jquery/jquery-1.11.1.min.js',
            'app/libs/swiper/js/swiper.min.js',     
            'app/libs/bootstrap/bootstrap.min.js',
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js/'));
});
//CSSnano+Rename
gulp.task('minlibscss', ['sass'], function() {
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/css'));
});

//Browser-sync
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

//Del
gulp.task('clean', function() {
    return del.sync('dist')
});
//Clear
gulp.task('clear-cache', function() {
    return cache.clearAll();
});
//imagemin + pngquant
gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            une: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});


//Watch
gulp.task('watch', ['browser-sync', 'minlibscss', 'minscripts', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});




//Build
gulp.task('build', ['clean', 'img', 'sass', 'minscripts'], function() {
    var buildCss = gulp.src([
            'app/css/main.css',
            'app/css/libs.min.css',
        ])
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist/'));

    var buildruHtml = gulp.src('app/ru/*.html')
        .pipe(gulp.dest('dist/ru'));

    var buildenHtml = gulp.src('app/en/*.html')
        .pipe(gulp.dest('dist/en'));

    var buildHtaccess = gulp.src('app/.htaccess')
        .pipe(gulp.dest('dist/'));

	var buildXml = gulp.src('app/*.xml')
        .pipe(gulp.dest('dist/'));

    var buildPhp = gulp.src('app/*.php')
        .pipe(gulp.dest('dist/'))
        .pipe(gulp.dest('dist/ru/'))
        .pipe(gulp.dest('dist/en/'));

    var buildImg = gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));
});