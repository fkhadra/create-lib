#!/usr/bin/env node

'use strict';

global.IS_WIN = /^win/.test(process.platform);
const yargConf = require('./yargConf');

const argv = require('yargs')
  .usage('Usage: $0 lib-name [options]')
  .command({
    command: 'config-list',
    desc: 'View the current configuration',
    handler: yargConf.listConfig
  })
  .command({
    command: 'config-edit',
    desc: 'Edit the current configuration',
    handler: yargConf.editConfig
  })
  .command({
    command: 'config-reset',
    desc: 'Reset the current configuration',
    handler: yargConf.resetConfig
  })
  .example('$0 my-lib-name')
  .demand(1)
  .help('h')
  .alias('h', 'help')
  .argv;


const projectName = argv._[0];
global.PROJECT_NAME = projectName;
const config = require('./config');
const createLib = require('./createLib');
const git = require('./git');
const npm = require('./npm');
const colors = require('colors');

createLib
  .init(projectName)
  .then(git.init)
  .then(git.addRemoteOrigin)
  .then(npm.init)
  .then(npm.install)
  .then(() => console.log('Youhou ! You are ready to make awesome things !'.rainbow))
  .catch(err => console.log(err));
