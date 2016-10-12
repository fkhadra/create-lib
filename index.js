#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const argv = yargs.argv;
const spawn = require('child_process').spawn;
const isWin = /^win/.test(process.platform);

yargs.usage('Usage: $0 projectName')
  .demand(1)
  .argv;

const projectName = argv._[0];

function dirExist(dir) {
  try {
    fs.statSync(dir);
    return true;
  } catch (e) {
    return false;
  }
}

function writeToFile(pathName, content) {
  let data = typeof content === 'object' ? JSON.stringify(content, null,4) : content;

  fs.writeFile(pathName, data, err => err && console.log(err));
}

if (!dirExist(projectName)) {
  fs.mkdirSync(projectName);
} else {
  throw new Error(`Cannot create ${projectName}, the directory already exist.`);
}

const config = require('./config').make(projectName);

process.chdir(projectName);

config.dirToCreate.forEach(dir => fs.mkdirSync(dir));

Object.keys(config.fileToCreate).forEach(k => {
  let file = config.fileToCreate[k];
  let pathName = 'undefined' !== typeof file.dir ? path.join(file.dir, file.name) : file.name;

  writeToFile(pathName, file.content);
});

const cmd = isWin ? 'npm.cmd' : 'npm';
const npm = spawn(cmd, ['init'], { stdio: 'inherit' });

