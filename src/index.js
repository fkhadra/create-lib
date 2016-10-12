#!/usr/bin/env node

'use strict';

const yargs = require('yargs');

yargs.usage('Usage: $0 projectName')
  .demand(1)
  .argv;
/*
 * Require if yargs
 * */
const mkdir = require('fs').mkdir;
const argv = yargs.argv;
const spawn = require('child_process').spawn;
const isWin = /^win/.test(process.platform);
const projectName = argv._[0];
const config = require('./config').make(projectName);
const utils = require('./utils');

console.log('Try to create directory');

mkdir(projectName, (err) => {
  if (err) {
    throw err;
  }
  process.chdir(projectName);

  console.log(`${projectName} created. Now creating others folders`);

  config.dirToCreate.forEach(utils.createDir);

  Object.keys(config.fileToCreate).forEach(k => utils.createFile(config.fileToCreate[k]));

});


//
// const cmd = isWin ? 'npm.cmd' : 'npm';
// const npm = spawn(cmd, ['init'], { stdio: 'inherit' });
//
