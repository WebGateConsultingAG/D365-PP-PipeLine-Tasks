const { getDirectories } = require("./utils");
const gulp = require("gulp");
const fs = require('fs-extra');
const path = require('path');
const merge2 = require("merge2");



const buildExtensionFile = async () => {
    var manifest = JSON.parse(fs.readFileSync(path.join("extension", "extension-manifest.json")));
    var taskContributionTemplate = JSON.parse(fs.readFileSync(path.join("extension", "task-template.json")));
    const tasks = await getDirectories("src/tasks");
    const contributions = tasks.map(dir=>{
        const contribution = {...taskContributionTemplate};
        const currentTask = JSON.parse(fs.readFileSync(path.join("src","tasks",dir, "task.json")));
        contribution.id = currentTask.id;
        contribution.properties.name = currentTask.name;
        return contribution;
    });
    manifest.contributions = contributions;
    fs.writeFileSync(path.join("dist","vss-extension.json"), JSON.stringify(manifest));
    const overviewCopy = gulp.src("extension/overview.md").pipe(gulp.dest("dist"));
    const assetCopy = gulp.src("extension/assets/**").pipe(gulp.dest("dist/assets"));
    return merge2(overviewCopy,assetCopy);
}

module.exports.buildExtensionFile = buildExtensionFile;