
const fs = require('fs');
const path = require('path');
const mkdir = require('mkdirp');

module.exports = {
  createDir(dir){
    mkdir(dir, (err) => {
      if (err) {
        throw err;
      }
      console.log(`- ${dir} created`);
    });
  },
  createFile(file) {
    const { name, content } = file;
    if (typeof name === 'string') {
      let data = this.sanitizeContent(content);
      const dirName = path.dirname(name);

      fs.stat(dirName, (err) => {
        if (err && err.code === 'ENOENT') {
          mkdir.sync(dirName);
        }
        fs.writeFile(name, data, (err) => {
          if (err) {
            throw err;
          }
          console.log(`- ${name} created`);
        });
      });
    }
  },
  sanitizeContent(content) {
    let data = content;

    if (typeof content === 'object') {
      data = JSON.stringify(content, null,4)
    } else if(typeof content === 'undefined') {
      data = '';
    }

    return data;
  }
};