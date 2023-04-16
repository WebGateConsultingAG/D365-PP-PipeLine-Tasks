const gulp = require("gulp");

const clean = require("./gulp/clean").clean;
const compile = require("./gulp/compile").compile;
gulp.task("clean", clean);
gulp.task("compile", compile);
gulp.task("recompile", gulp.series(clean, compile));

//const lint = require("./gulp/lint");
//const test = require("./gulp/test");
//const restore = require("./gulp/restore");
//const pack = require("./gulp/pack");

exports.clean = clean;
exports.compile = compile;
exports.recompile = 
//exports.lint = lint;
//exports.test = test.all;
//exports.unitTest = test.unitTest;
//exports.componentTest = test.componentTest;
//exports.functionalTest = test.functionalTest;
//exports.preparePack = gulp.series(recompile, restore);
//exports.pack = pack;
//exports.repack = gulp.series(compile, pack);
//exports.ci = gulp.series(recompile, lint, restore, test.unitTest, pack, test.functionalTest);
exports.default = gulp.series(clean, compile);;
//exports.restore = restore;