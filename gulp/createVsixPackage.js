const {run} = require("./utils");

const createVsixPackage = (cb) => {

    run("tfx extension create --manifest-globs vss-extension.json --root dist --output-path vsixPackage");
    cb();
}

module.exports.createVsixPackage = createVsixPackage;