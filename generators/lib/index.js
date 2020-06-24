'use strict';
const path = require('path');
const inquirer = require('inquirer');
const fsExtra = require('fs-extra');
var Generator = require('yeoman-generator');
const { kebabCase } = require('lodash');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const ora = require('ora');

/**
 * get the date in YYYY-MM-DD format
 */
const getFormattedDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  return(yyyy + '-' + mm + '-' + dd);
}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    // https://github.com/feathersjs/generator-feathers/blob/03fb7b5bd96574823c65df32e370e8e7dacc0d76/generators/app/index.js#L10
    this.props = { name: process.cwd().split(path.sep).pop() };
  }

  someMethodAnyName() {
    goLibGo(this.destinationRoot() + '');
  }
};

// https://askubuntu.com/a/1012016
const packageData = require(path.join(__dirname, '..', '..', 'package.json'));
const { version, name } = packageData;
const logoText = `\x1B[32m${name}@${version} \x1B[32m`;

const cleanName = function (data) {
  data = data.replace(new RegExp(/ /, 'g'), '-');
  data = data.replace(new RegExp(/---/, 'g'), '-');
  return data.replace(new RegExp(/--/, 'g'), '-');
};

const getCurrentDir = function (dir) {
  const newDir = dir.split(path.sep).pop();
  return cleanName(newDir);
};

var questions = [{
  type: 'input',
  name: 'camelcaseName',
  message: 'Lib name (use camelCase or kebab-case => will be transformed to kebab-case)',
  default: getCurrentDir(process.cwd())
}, {
  type: 'input',
  name: 'githubUsername',
  message: 'Enter your github username',
  default: 'nriesco'
}];

const showNextStep = function (dirname = false) {
  console.log('\x1B[0m');
  console.log('\x1B[32mDone!\x1B[0m');
  console.log('\x1B[96mHappy coding!\x1B[0m');
  console.log('\x1B[0m');
};

const executeNextStep = async function(dirname = false) {
  const spinner = ora('\x1B[96m2/3 Installing...\x1B[0m').start();
  await exec('npm i', {cwd: `${dirname}`});
  spinner.stop();
  const spinner2 = ora('\x1B[96m3/3 Testing...\x1B[0m').start();
  await exec('npm run test', {cwd: `${dirname}`});
  spinner2.stop();
}

const replaceInFiles = (thePath, filesArray, libName, githubUsername) => {

  const replace = require('replace-in-file');
  let options = [];

  let files = [];
  filesArray.forEach(elem => {
    files.push(thePath + '/' + elem);
  })

  options.push({
    files,
    from: /lib-template-temp-name-must-replace/g,
    to: libName,
  });

  options.push({
    files,
    from: /\[\[THE_DATE\]\]/g,
    to: getFormattedDate(),
  });

  options.push({
    files,
    from: /\[\[YOUR_GITHUB_USERNAME_HERE\]\]/g,
    to: githubUsername,
  });

  const executeChanges = async (options) => {
    try {
      for (let option of options) {
        await replace(option);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  executeChanges(options);

}

const goLibGo = async function (outPath) {
  console.log(logoText);

  const answers = await inquirer.prompt(questions); // prompt
  let camelcaseName = kebabCase(answers.camelcaseName);
  let { githubUsername } = answers; 

  let defaultDir = getCurrentDir(process.cwd());
  let isDefaultDir = (camelcaseName === defaultDir);
  if (isDefaultDir) camelcaseName = '';

  const spinner = ora('\x1B[96m1/3 Copying files...\x1B[0m').start();

  await fsExtra.ensureDir(path.join(outPath, camelcaseName));
  await fsExtra.copy(path.join(__dirname, 'template'), path.join(outPath, camelcaseName));

  await replaceInFiles(path.join(outPath, camelcaseName), ['package.json', 'package-lock.json', 'CHANGELOG.md', 'README.md'], camelcaseName, githubUsername)

  spinner.stop();

  if (isDefaultDir) {
    await executeNextStep();
  } else {
    await executeNextStep(camelcaseName);
  }

  // end
  showNextStep()

};
