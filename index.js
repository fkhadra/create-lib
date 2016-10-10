#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectName = process.argv.slice(2)[0];
const pathName = path.join(__dirname, projectName);

const dirToCreate = ['src', 'lib', 'scripts'];

function dirExist(dir) {
  try {
    fs.statSync(dir);
    return true;
  } catch(e) {
    return false;
  }
}

if (! dirExist(pathName)) {
  fs.mkdirSync(pathName);
} else {
  throw new Error(`Cannot create ${projectName}, the directory already exist.`);
}

process.chdir(pathName);

dirToCreate.forEach(dir => fs.mkdirSync(dir));

