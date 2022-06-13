const fs = require('fs');

const readFile = async (path) => JSON.parse(fs.readFileSync(path));

const writeFile = async (path, data) => fs.writeFileSync(path, data);

module.exports = {
  readFile,
  writeFile,
};