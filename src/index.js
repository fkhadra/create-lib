#!/usr/bin/env node

'use strict';

const argv = require('yargs')
  .usage('Usage: $0 lib-name [options]')
  //.usage('Usage: $0 <command> ')
  .command('list-config', 'Edit the configuration')
  .command('edit-config', 'Edit the configuration')
  .command('reset-config', 'Reset the config')
  .example('$0 my-lib-name')
  .default('verbose', 0, 'Verbose')
  .boolean(['v'])
  .demand(1)
  .help('h')
  .alias('h', 'help')
  .count('verbose')
  .alias('v', 'verbose')
  .argv;

const fs = require('fs');
const command = argv._[0];
const spawn = require('child_process').spawn;
global.isWin = /^win/.test(process.platform);
const editor = isWin ? 'notepad' : 'vim';
const path = require('path');

switch (command) {
  case 'edit-config':
    const edit = spawn(editor, ['./src/config.js'], {stdio: 'inherit'});
    edit.on('exit', () => process.exit());
    break;
  case 'list-config':
    const more = spawn('more', [path.join('./src/config.js')], {stdio: 'inherit'});
    more.on('exit', () => process.exit());
    break;
}



const projectName = argv._[0];
global.PROJECT_NAME = projectName;
//const config = require('./config');
const createLib = require('./createLib');
const git = require('./git');
const npm = require('./npm');




// createLib
//   .init(projectName)
//  .then(git.init)
// .then(git.addRemoteOrigin)
// .then(npm.init)
//.then(() => console.log('youou'))
//.catch( err => console.log(err));
// new Promise((res) => {
//   mkdir(projectName, (err) => {
//     if (err) {
//       throw err;
//     }
//     process.chdir(projectName);
//
//     console.log(`${projectName} created. Now creating others folders`);
//
//     config.dirToCreate.forEach(utils.createDir);
//
//     Object.keys(config.fileToCreate).forEach(k => utils.createFile(config.fileToCreate[k]));
//
//     res();
//
//   })
// })
// .then(() => {
//   gitInit();
// });



