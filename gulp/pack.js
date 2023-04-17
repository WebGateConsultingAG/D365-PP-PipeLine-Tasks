const { mkdirp, copyFile } = require("fs-extra");
const gulp = require("gulp");
var shell = require('shelljs');
var ncp = require('child_process');
const merge2 = require("merge2");
const { getDirectories } = require("./utils");

var shellAssert = function () {
    var errMsg = shell.error();
    if (errMsg) {
        throw new Error(errMsg);
    }
}
const cd = (dir) => {
    shell.cd(dir);
    shellAssert();
}
const run = (cl, inheritStreams, noHeader) => {
    if (!noHeader) {
        console.log();
        console.log('> ' + cl);
    }

    var options = {
        stdio: inheritStreams ? 'inherit' : 'pipe'
    };
    var rc = 0;
    var output;
    try {
        output = ncp.execSync(cl, options);
    }
    catch (err) {
        if (!inheritStreams) {
            console.error(err.output ? err.output.toString() : err.message);
        }

        process.exit(1);
    }
    return (output || '').toString().trim();
}

const prepareNpm = async () => {
    await mkdirp("build/npm");
    await copyFile("package.json", "build/npm/package.json");
    var originalDir = shell.pwd();
    cd('./build/npm');
    run("npm install --omit dev")
    cd(originalDir);
}

const pack = async () => {
    await prepareNpm();
    const tasks = await getDirectories("src/tasks");
    const copyJobs = tasks.map(dir => {
        const job1 = gulp.src("./build/npm/node_modules/**").pipe(gulp.dest("dist/tasks/" + dir + "/node_modules"));
        const job2 = gulp.src("src/tasks/"+dir +"/task.json").pipe(gulp.dest("dist/tasks/" + dir));
        return merge2(job1,job2);
    });
    return merge2(copyJobs);
}


exports.pack = pack;
