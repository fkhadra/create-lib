const spawn = require('child_process').spawn;
const spawnSync = require('child_process').spawnSync;
const fs = require('fs');
const config = require('./config');
const npmCli = IS_WIN ? 'npm.cmd' : 'npm';

module.exports = {
  init() {
    return new Promise((resolve, reject) => {
      const npm = spawn(npmCli, ['init', '-y']);
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
  },
  install() {
    return new Promise((resolve, reject) => {
      if (config.npm.dependencies.length > 0) {
        const opts = [].concat('i',config.npm.dependencies, '-S');
        const npm = spawnSync(npmCli, opts, {stdio: 'inherit'});
      }
      if (config.npm.devDependencies.length > 0) {
        const opts = [].concat('i',config.npm.devDependencies, '-D');
        const npm = spawnSync(npmCli, opts, {stdio: 'inherit'});
      }
      resolve();
    });
  }
};