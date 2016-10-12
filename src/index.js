#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
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

yargs
  .usage('Usage: $0 <command> [options]')
  .command('lib-name','Create the lib folder with the given name')
  .example('$0 foobar --git-init=true --npm-init=true', 'Same as $0 foobar')
  .default('git-init', true, 'Init a new git repository')
  .default('npm-init', true, 'Run npm init')
  .default('verbose', 0, 'Verbose')
  .boolean(['git-init', 'npm-init', 'v'])
  .demand(1)
  .help('h')
  .alias('h', 'help')
  .count('verbose')
  .alias('v', 'verbose')
  .argv;



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
