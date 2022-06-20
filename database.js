const fs = require('fs').promises;

const readFile = async () => {
    const data = await fs.readFile('./talker.json', 'utf-8');
    return data;
};

const writeFile = async (path, data) => fs.writeFile(path, data);

module.exports = {
  readFile,
  writeFile,
};