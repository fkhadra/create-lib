const spawn = require('child_process').spawn;
const colors = require('colors');
const readline = require('readline');
const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const gitCli = IS_WIN ? 'git' : 'git';

module.exports = {
  init() {
    return new Promise( (resolve, reject) => {
      const git = spawn(gitCli,['init'], { stdio: 'inherit' });

      git.on('error', (err) => reject(err));
      git.on('exit', () => {
        r.question('Repository url :'.yellow, (answer) => {
          resolve(answer);
          r.close();
        });
      });
    });
  },
  addRemoteOrigin(repository) {
    return new Promise( (resolve, reject) => {
      if (repository.length > 0) {
        const git = spawn(gitCli, ['remote', 'add', 'origin', repository], { stdio: 'inherit' });
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