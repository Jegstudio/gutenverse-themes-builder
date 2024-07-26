/**
 * Task to building styles
 */

const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const gulp = require("gulp");
const mqpacker = require("css-mqpacker");
const path = require("path");
const postcss = require("gulp-postcss");
const concat = require("gulp-concat");
const sass = require("gulp-sass")(require("sass"));
const del = require("del");
const replace = require('gulp-string-replace');

const postCSSOptions = [
    autoprefixer(),
    mqpacker(), // Gabung media query jadi satu
    cssnano(), // Minify css
];

const sassOptions = {
    includePaths: [path.resolve(__dirname, "./src/")],
};

module.exports = {
    postCSSOptions,
    sassOptions,
};

gulp.task("editor", function () {
    return gulp
        .src([path.resolve(__dirname, "./src/theme-builder/blocks/editor.scss")])
        .pipe(sass({ includePaths: ["node_modules"] }))
        .pipe(sass(sassOptions).on("error", sass.logError))
        .pipe(concat("editor.css"))
        .pipe(postcss(postCSSOptions))
        .pipe(gulp.dest("gutenverse-themes-builder/assets/css/"));
});

gulp.task("frontend", function () {
    return gulp
        .src([path.resolve(__dirname, "./src/theme-builder/blocks/frontend.scss")])
        .pipe(sass({ includePaths: ["node_modules"] }))
        .pipe(sass(sassOptions).on("error", sass.logError))
        .pipe(concat("frontend.css"))
        .pipe(postcss(postCSSOptions))
        .pipe(gulp.dest("gutenverse-themes-builder/assets/css/"));
});

gulp.task("page", function () {
    return gulp
        .src([path.resolve(__dirname, "./src/theme-builder/builder-page/assets/scss/index.scss")])
        .pipe(sass({ includePaths: ["node_modules"] }))
        .pipe(sass(sassOptions).on("error", sass.logError))
        .pipe(concat("builder.css"))
        .pipe(postcss(postCSSOptions))
        .pipe(gulp.dest("gutenverse-themes-builder/assets/css/"));
});

gulp.task("build-process", gulp.parallel("editor", "frontend", "page"));

gulp.task("build", gulp.series("build-process"));

const watchProcess = (basePath = ".") => {
    gulp.watch([`${basePath}/src/**/*.scss`], gulp.parallel(["editor", "frontend", "page"]));
};

gulp.task(
    "watch",
    gulp.series("build-process", function watch(done) {
        watchProcess();
        done();
    })
);


gulp.task("clean", function () {
    return del([
        './build/**',
        './release/**',
        './gutenverse-themes-builder/assets/js/**',
        './gutenverse-themes-builder/assets/css/**',
        './gutenverse-themes-builder/languages/**',
        './gutenverse-themes-builder/lib/dependencies/**'
    ], { force: true });
});


/**
 * Gulp package release
 */
gulp.task("copy-plugin-folder", function () {
    return gulp
        .src(['./gutenverse-themes-builder/**/*','!./gutenverse-themes-builder/lib/framework/**'], { encoding: false })
        .pipe(gulp.dest('./release/gutenverse-themes-builder/'));
});

gulp.task("copy-framework", function () {
    return gulp
        .src('./gutenverse-core/framework/**/*', { encoding: false })
        .pipe(gulp.dest('./release/gutenverse-themes-builder/lib/framework/'));
});

gulp.task('replace-text-domain', function () {
    return gulp
        .src('./release/gutenverse-themes-builder/lib/framework/**/*')
        .pipe(replace('--gctd--', 'gtb'))
        .pipe(gulp.dest('./release/gutenverse-themes-builder/lib/framework/'));
});


gulp.task("release", gulp.series(
    "copy-plugin-folder",
    "copy-framework",
    "replace-text-domain"
));

async function getZip() {
    const zip = await import('gulp-zip');
    return zip.default;
};

gulp.task("zip", async function () {
    const zip = await getZip();

    return gulp
        .src('./release/gutenverse-themes-builder/**', {base: './release', encoding: false })
        .pipe(zip('gutenverse-themes-builder.zip'))
        .pipe(gulp.dest('./release'));
});

module.exports.watchProcess = watchProcess;
