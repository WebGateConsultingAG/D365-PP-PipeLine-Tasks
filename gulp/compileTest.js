const gulp = require("gulp");
const ts = require("gulp-typescript");

const compileTest = ()=> {
     const tsProject = ts.createProject("tsconfig.json");
     return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("out"));
}

module.exports.compileTest = compileTest;