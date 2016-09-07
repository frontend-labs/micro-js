var gulp                  = require("gulp");
var config                = require("/usr/local/share/config/Configfile.js");
var babel                 = require("gulp-babel");
var gulpRecursiveFolder   = require("gulp-recursive-folder");
var concat                = require("gulp-concat");
var rename                = require("gulp-rename");
var sourceMaps            = require("gulp-sourcemaps");
var uglify                = require("gulp-uglify");
var jshint                = require("gulp-jshint");
var runSequence           = require("run-sequence");

gulp.task("default", function(){
    runSequence("babel", "concat");
});

gulp.task("babel", function(){
    return gulp.src(config.babel.src)
        .pipe(babel(config.babel.options))
        .pipe(gulp.dest(config.babel.build));
});

gulp.task("concat", gulpRecursiveFolder({
        base: config.js.recursiveFolder.src
    }, function(folderFound){
        return gulp.src(folderFound.path + "/*.js")
            .pipe(concat(folderFound.name + ".js"))
            .pipe(rename(config.js.rename.options))
            .pipe(sourceMaps.init())
            .pipe(uglify(config.js.uglify))
            .pipe(sourceMaps.write())
            .pipe(gulp.dest(config.js.recursiveFolder.build + folderFound.name));
}));

gulp.task("hint", function(){
    return gulp.src(config.js.hint.src)
        .pipe(jshint(config.js.hint.jshintrc))
        .pipe(jshint.reporter(config.js.hint.reporterStyle))
        .pipe(jshint.reporter(config.js.hint.reporter));
});
