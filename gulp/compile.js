const gulp = require("gulp");
const ts = require("gulp-typescript");
const {getDirectories} = require("./utils");
const merge = require("merge2");

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
};

exports.compile = compile;
