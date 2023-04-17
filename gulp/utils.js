const { readdir } = require('fs/promises');
const ncp = require('child_process');
var shell = require('shelljs');

const getDirectories = async source =>
  (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

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
const shellAssert = () => {
  var errMsg = shell.error();
  if (errMsg) {
      throw new Error(errMsg);
  }
}
const cd = (dir) => {
  shell.cd(dir);
  shellAssert();
}
const pwd = () =>{
  return shell.pwd();
}

module.exports.getDirectories = getDirectories;
module.exports.run = run;
module.exports.cd = cd;
module.exports.shellAssert = shellAssert;
module.exports.pwd = pwd;