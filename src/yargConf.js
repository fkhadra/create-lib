const colors = require('colors');
const fs = require('fs');
const path = require('path');
const configPathname = path.join(__dirname, 'config.js');
const defaultConfigPathname = path.join(__dirname, 'defaultConfig.js');
const spawnSync = require('child_process').spawnSync;
const editor = IS_WIN ? 'write' : 'vim';

module.exports = {
  listConfig() {
    spawnSync('more', [configPathname], {stdio: 'inherit'});
    process.exit();
  },
  editConfig() {
    spawnSync(editor, [configPathname], {stdio: 'inherit'});
    process.exit();
  },
  resetConfig() {
    spawnSync('cp', [defaultConfigPathname, configPathname], {stdio: 'inherit'});
    console.log('Reset Config Done'.green);
    process.exit();
  }
};