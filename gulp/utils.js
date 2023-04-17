const { readdir } = require('fs/promises');
const ncp = require('child_process');

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

module.exports.getDirectories = getDirectories;
module.exports.run = run;