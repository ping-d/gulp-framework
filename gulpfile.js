var gulp = require("gulp");
var del = require("del");//node插件
var concat = require("gulp-concat");//合并
var uglify = require("gulp-uglify");//压缩js
var minify = require("gulp-minify-css");//压缩css
var sass = require('gulp-sass');//编译sass


var BASE_PATH="./src/assets";
var ROOT_PATH="./dist/assets";


//清除文件
gulp.task("clean",function(){
    return del(["./dist/**"],{force: true});
});

/*//合并CSS
gulp.task("concatCss",function(){
    return gulp.src(["./src/css/common.scss","./src/css/agreement.css"])
        .pipe(concat("mobile.css"))
        .pipe(minify())
        .pipe(gulp.dest(ROOT_PATH+"/css/"))
});*/

//编译sass
gulp.task('sass', function () {
    return gulp.src(BASE_PATH+'/css/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))  //compressed  expanded
        .pipe(gulp.dest(ROOT_PATH+'/css/'));
});

//复制CSS
gulp.task("copyCss",function(){
    return gulp.src(BASE_PATH+'/css/*.css')
        /*.pipe(minify())*/
        .pipe(gulp.dest(ROOT_PATH+"/css/"))
});

//复制Libjs
gulp.task("libJs",function(){
    return gulp.src(BASE_PATH+"/js/**")
       /* .pipe(uglify())*/                 //压缩js
        .pipe(gulp.dest(ROOT_PATH+"/js"))
});

/*//复制js
gulp.task("copyJs",function(){
    return gulp.src(BASE_PATH+"/js/!*.js")
        /!*.pipe(uglify())*!/
        .pipe(gulp.dest(ROOT_PATH+"/js"))
});*/

//复制图片
gulp.task("copyImg",function(){
    return gulp.src(BASE_PATH+"/images/**")
        .pipe(gulp.dest(ROOT_PATH+"/images/"))
});

//复制html
gulp.task("copyHtml",function(){
    return gulp.src("./src/*.html")
        .pipe(gulp.dest("./dist"))
});

/*//复制公用文件
 gulp.task("copyHtmlConcatFile",function(){
 gulp.src("./src/index.html")
 .pipe(fileInclu({
 prefix:"@@",
 basepath:"@file"
 }))
 .pipe(gulp.dest("./dist"))
 })*/

//监听变化
gulp.task("watch",function(){
    gulp.watch("./src/*.html",["copyHtml"]);
    gulp.watch(BASE_PATH+"/images/**",["copyImg"]);
    /*gulp.watch(BASE_PATH+"/js/!*.js",["copyJs"]);*/
    gulp.watch(BASE_PATH+"/js/**",["libJs"]);
    gulp.watch(BASE_PATH+"/css/*.css",["copyCss"]);
    gulp.watch(BASE_PATH+"/css/*.scss",["sass"]);
});

//启动任务
gulp.task("default",["clean"],function(){
    gulp.start("copyImg","libJs","copyCss","sass","copyHtml","watch")
});