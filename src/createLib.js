const mkdir = require('fs').mkdir;
const utils = require('./utils');
const config = require('./config');

module.exports = {
  init(projectName) {
    return new Promise((resolve, reject) => {
      mkdir(projectName, (err) => {
        if (err) {
          reject(err);
        }
        process.chdir(projectName);

//        INFO(`${projectName} created. Now creating others folders`);

        config.dirToCreate.forEach(utils.createDir);

        Object.keys(config.fileToCreate).forEach(k => utils.createFile(config.fileToCreate[k]));

        resolve();
      });
    })
  }
};