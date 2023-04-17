const { mkdirp, copyFile } = require("fs-extra");
const gulp = require("gulp");
const merge2 = require("merge2");
const { getDirectories, cd, run, pwd } = require("./utils");

const prepareNpm = async () => {
    await mkdirp("build/npm");
    await copyFile("package.json", "build/npm/package.json");
    var originalDir = pwd();
    cd('./build/npm');
    run("npm install --omit dev")
    cd(originalDir);
}

const packOnly = async () => {
    await prepareNpm();
    const tasks = await getDirectories("src/tasks");
    const copyJobs = tasks.map(dir => {
        const job1 = gulp.src("./build/npm/node_modules/**").pipe(gulp.dest("dist/tasks/" + dir + "/node_modules"));
        const job2 = gulp.src("src/tasks/" + dir + "/task.json").pipe(gulp.dest("dist/tasks/" + dir));
        return merge2(job1, job2);
    });
    return merge2(copyJobs);
}

exports.packOnly = packOnly;
