const { getDirectories } = require("./utils");
const gulp = require("gulp");
const fs = require('fs-extra');
const path = require('path');
const merge2 = require("merge2");



const buildExtensionFile = async () => {
    var manifest = JSON.parse(await fs.readFile(path.join("extension", "extension-manifest.json")));
    var taskContributionTemplate = JSON.parse(await fs.readFile(path.join("extension", "task-template.json")));
    const tasks = await getDirectories("src/tasks");
    const contributions = tasks.map(dir=>{
        const contribution = {...taskContributionTemplate};
        const currentTask = JSON.parse(fs.readFileSync(path.join("src","tasks",dir, "task.json")));
        contribution.id = currentTask.id;
        contribution.properties.name = currentTask.name;
        return contribution;
    });
    manifest.contributions = contributions;
    await fs.copyFile("extension/overview.md", "dist/overview.md")
    await fs.copy("extension/assets/", "dist/assets");
    await fs.writeFile(path.join("dist","vss-extension.json"), JSON.stringify(manifest));
}

module.exports.buildExtensionFile = buildExtensionFile;