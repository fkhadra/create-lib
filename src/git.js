const spawn = require('child_process').spawn;
const readline = require('readline');
const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = {
  init() {
    return new Promise( (resolve, reject) => {
      const git = spawn('git',['init'], { stdio: 'inherit' });

      git.on('error', (err) => reject(err));
      git.on('exit', () => {
        r.question('Repository url :', (answer) => {
          resolve(answer);
          r.close();
        });
      });
    });
  },
  addRemoteOrigin(repository) {
    return new Promise( (resolve, reject) => {
      if (repository.length > 0) {
        const git = spawn('git', ['remote', 'add', 'origin', repository], { stdio: 'inherit' });
        console.log(repository);
        git.on('error', (err) => reject(err));
        git.on('exit', (code) => resolve(code));
      }
      resolve();
    });
  },
  handleError(error) {
    if (error.spawnargs[0] === 'init') {
      console.log('Unable to init a git repository. Please check that git is installed or available in your path.');
    }
  }
};