const gulp = require("gulp");

const clean = require("./gulp/clean").clean;
const compile = require("./gulp/compile").compile;
const compileTest = require("./gulp/compileTest").compileTest;

//const lint = require("./gulp/lint");
//const test = require("./gulp/test");
//const restore = require("./gulp/restore");
const packOnly = require("./gulp/packOnly").packOnly;
const buildExtensionFile = require("./gulp/buildExtensionFile").buildExtensionFile;
const createVsixPackage = require("./gulp/createVsixPackage").createVsixPackage;

exports.clean = clean;
exports.compile = compile;
exports.recompile = gulp.series(clean, compile, compileTest);
exports.packOnly = packOnly;
exports.pack = gulp.series(clean, compile, packOnly, buildExtensionFile, createVsixPackage);
exports.buildExtensionFile = buildExtensionFile;
exports.createVsixPackage = createVsixPackage;
//exports.lint = lint;
//exports.test = test.all;
//exports.unitTest = test.unitTest;
//exports.componentTest = test.componentTest;
//exports.functionalTest = test.functionalTest;
//exports.preparePack = gulp.series(recompile, restore);
//exports.pack = pack;
//exports.repack = gulp.series(compile, pack);
//exports.ci = gulp.series(recompile, lint, restore, test.unitTest, pack, test.functionalTest);
exports.default = gulp.series(clean, compile, compileTest);;
//exports.restore = restore;