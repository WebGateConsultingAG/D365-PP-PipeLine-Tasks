const { statSync } = require("fs-extra");
const find = require("find");
const path = require("path");
const gulp = require("gulp");
var ts = require("gulp-typescript");
const {readdir} = require('fs/promises');
const merge = require("merge2");

exports.compile = compile

const getDirectories = async source =>
  (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

async function compile() {
  // detect if running on an AzDevOps build agent
  const packageJson = require("../package.json");
  if (process.env.BUILD_BUILDID) {
    // https://docs.microsoft.com/en-us/azure/devops/pipelines/scripts/logging-commands?view=azure-devops&tabs=bash
    console.log(`##vso[build.updatebuildnumber]${packageJson.version}`);
  } else {
    console.log(`local build: ${packageJson.version}`);
  }
  const tasks = await getDirectories("src/tasks");
  console.log(tasks);
  const running = tasks.map(dir=>{
    const tsProject = ts.createProject("./src/tasks/"+dir +"/tsconfig.json");
    //const tsProject = ts.createProject("tsconfig.json");
    //return tsProject.src().on("error", (e)=>console.log(e));
    return tsProject.src().pipe(tsProject(ts.reporter.defaultReporter()).on("error", (e)=>console.log(e))).js.pipe(gulp.dest("dist/tasks/"+dir));
  
  });
  console.log("RUNNING", running.length);
  return merge(running);
  //console.log(tsProject);
  //await tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist/tasks/"+dir))    
};

function onBuild(done) {
  return function (err, result) {
    if (err) {
      console.error(`Webpack error:\n${err}`);
      if (done) {
        done();
      }
    } else {
      result.stats.forEach((stats) => {
        Object.keys(stats.compilation.assets).forEach(function (key) {
          console.log(`Webpack: output ${key}`);
        });
        const size = statSync(path.join(stats.compilation.outputOptions.path, stats.compilation.outputOptions.filename)).size;
        console.log(`Webpack: finished, size = ${size}`);
      });
      if (done) {
        done();
      }
    }
  };
}
