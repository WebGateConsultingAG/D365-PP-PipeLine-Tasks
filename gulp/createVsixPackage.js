const {run} = require("./utils");

const createVsixPackage = () => {

    run("tfx extension create --manifest-globs vss-extension.json --root dist --output-path vsixPackage");
}

module.exports.createVsixPackage = createVsixPackage;