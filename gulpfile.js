// ------------------------------------ //
//        使用するプラグインと機能詳細       //
// ------------------------------------ //

const gulp = require('gulp'),
 gulpEct = require('gulp-ect'),
 gulpDartSass = require('gulp-dart-sass'),      // @use,@forwordの利用可能sass
 gulpImagemin = require('gulp-imagemin'),       // 画像圧縮用
 mozjpeg = require('imagemin-mozjpeg'),         // 画像圧縮用
 pngquant = require('imagemin-pngquant'),       // 画像圧縮用
 notify = require('gulp-notify'),               // エラーが発生したときにデスクトップに通知する
 plumber = require('gulp-plumber'),             // Stream中に起こるのエラーが原因でタスクが強制停止することを防止する
 browserSync = require('browser-sync'),         // ブラウザのオートリロードプラグイン
 gulpWebpack = require('webpack'),              // webpack
 webpackStream = require("webpack-stream");     // gulpでwebpackを使うために必要なプラグイン


// ------------------------------------ //
//             定数をセット               //
// ------------------------------------ //

const SRC = 'src';      // ソースフォルダ
const DIST = 'dist';    // 出力先（吐き出し）フォルダ
const ectConfig = () => require('./src/include/_const.js');
const webpackConfig = require('./webpack.config');

// ------------------------------------ //
//               タスク処理               //
// ------------------------------------ //

//
// browserSync ブラウザのオートリロード
//
function server(done) {
    browserSync.init({
        server: {
            baseDir: DIST
        }
    });
    done();
}

//
// ect
//
function ect(done) {
    gulp.src([SRC + '/ect/**/*.ect', '!src/ect/**/_*.ect'])
        .pipe(gulpEct({
            data: function (file, cb) {
                console.log(file); //エラーが発生したファイル名を表示
                cb(ectConfig);
            }
        }))
        .pipe(gulp.dest(DIST))
        .pipe(browserSync.reload({ stream: true }));
    done();
}

//
// sass @use,@forwordの利用可能sass
//
function sass(done) {
    gulp.src(SRC + '/sass/**/*.scss')
        .pipe(plumber(notify.onError('Error: <%= error.message %>')))
        .pipe(gulpDartSass({
            outputStyle: 'compressed' //nested,compact,expanded,compressed
        }))
        .pipe(gulp.dest(DIST + '/css/'))
        .pipe(browserSync.reload({ stream: true }));
    done();
}

//
// imagemin 画像圧縮
//
function imagemin(done) {
    gulp.src(SRC + '/img/assets/*')
        .pipe(gulpImagemin([
            pngquant({
                quality: [0.6, 0.7],
                speed: 1,
            }),
            mozjpeg({ quality: 65 }),
            gulpImagemin.svgo(),
            gulpImagemin.optipng(),
            gulpImagemin.gifsicle({ optimizationLevel: 3 }),
        ]))
        .pipe(gulp.dest(DIST + '/images/assets/'))
        .pipe(plumber({
            errorHandler: notify.onError({
                message: 'Error: <%= error.message %>',
                title: 'imageminify'
            })
        }))
    gulp.src(SRC + '/img/content/*')
        .pipe(gulpImagemin([
            pngquant({
                quality: [0.6, 0.7],
                speed: 1,
            }),
            mozjpeg({ quality: 65 }),
            gulpImagemin.svgo(),
            gulpImagemin.optipng(),
            gulpImagemin.gifsicle({ optimizationLevel: 3 }),
        ]))
        .pipe(gulp.dest(DIST + '/images/content/'))
        .pipe(plumber({
            errorHandler: notify.onError({
                message: 'Error: <%= error.message %>',
                title: 'imageminify'
            })
        }))
    done();
}

// 
// webpack
// 
function webpack(done) {
    webpackStream(webpackConfig, gulpWebpack)
    .pipe(gulp.dest(DIST + '/js/'))
    .pipe(browserSync.reload({stream: true}))
    done();
};


// watch ファイルの変更を監視してGulpタスクを自動実行
function watch() {
    // gulp.watch(監視する対象ファイル, ファイルが更新された時に実行するタスク名)
    gulp.watch(SRC + '/ect/**/*.ect', gulp.parallel(ect));
    gulp.watch(SRC + '/sass/**/*.scss', gulp.parallel(sass));
    gulp.watch(SRC + '/js/**/*.js', gulp.parallel(webpack));    
}


exports.default = gulp.series(server,watch);
exports.all = gulp.series(imagemin,sass,webpack);
exports.sass = sass;
exports.webpack = webpack;
exports.imagemin = imagemin;
