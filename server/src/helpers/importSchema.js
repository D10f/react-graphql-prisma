const { readFileSync } = require('fs');
const { resolve } = require('path');

/**
* Reads a file and returns it as a string of text
* @param  {string} pathToFile The location of the file to be read
* @return {string}            String of text with the contents of the file
*/
function importSchema(pathToFile) {
  const fullPath = resolve(pathToFile);
  const schema = readFileSync(fullPath, err => {
    if (err) throw err;
  });
  return schema.toString();
}

module.exports = importSchema;
