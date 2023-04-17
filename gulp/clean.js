const { emptyDir } = require("fs-extra");
exports.clean = clean;

async function clean() {
  await Promise.all(["dist", "out","dist","build","vsixPackage"].map((dir) => emptyDir(dir)));
}
