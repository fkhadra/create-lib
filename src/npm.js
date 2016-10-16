const spawn = require('child_process').spawn;
const fs = require('fs');
const config = require('./config');

module.exports = {
  init() {
    return new Promise((resolve, reject) => {
      const npm = spawn('npm', ['init', '-y']);
      //silent stdout
      npm.on('error', err => reject(err));
      npm.on('exit', () => {
        const content = JSON.parse(fs.readFileSync('./package.json'));
        Object.assign(content, {
          scripts: config.npm.scripts,
          main: config.npm.main,
          license: config.npm.license
        });
        fs.unlink('./package.json', (err) => {
          if (err) {
            reject(err);
          }
          fs.writeFile('package.json', JSON.stringify(content, null, 4), (err) => {
            if (err) {
              reject(err);
            }
            resolve();
          })
        })
      });
    });
  }
};