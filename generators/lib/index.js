'use strict'
const path = require('path')
// const inquirer = require('inquirer')
const fsExtra = require('fs-extra')
const Generator = require('yeoman-generator')
const { kebabCase } = require('lodash')
// const util = require('util')
const { exec } = require('child_process')
const ora = require('ora')
const wait = timeout => (new Promise(resolve => setTimeout(resolve, timeout)))

/**
 * promise version of exec
 */
const promiseExec = async (command, params = {}) => {
  return new Promise((resolve, reject) => {
    exec(command, params, (err, data) => {
      if (err) return reject(new Error(`Fail to execute '${command}'`))
      return resolve(data)
    })
  })
}

/**
 * get the date in YYYY-MM-DD format
 */
const getFormattedDate = () => {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
  const yyyy = today.getFullYear()

  return (yyyy + '-' + mm + '-' + dd)
}

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)
    // https://github.com/feathersjs/generator-feathers/blob/03fb7b5bd96574823c65df32e370e8e7dacc0d76/generators/app/index.js#L10
    this.props = { name: process.cwd().split(path.sep).pop() }
  }

  async prompting () {
    this.answers = await this.prompt(questions)
  }

  someMethodAnyName () {
    goLibGo(this.destinationRoot() + '', this.answers)
  }
}

// https://askubuntu.com/a/1012016
const packageData = require(path.join(__dirname, '..', '..', 'package.json'))
const { version, name } = packageData
const logoText = `\x1B[32m${name}@${version} \x1B[32m`

const cleanName = function (data) {
  data = data.replace(/ /, 'g', '-')
  data = data.replace(/---/, 'g', '-')
  return data.replace(/--/, 'g', '-')
}

const getCurrentDir = function (dir) {
  const newDir = dir.split(path.sep).pop()
  return cleanName(newDir)
}

const questions = [{
  type: 'input',
  name: 'camelcaseName',
  message: 'Lib name (will be transformed to kebab-case)',
  default: getCurrentDir(process.cwd())
}, {
  type: 'input',
  name: 'githubUsername',
  message: 'Enter your github username',
  default: 'nriesco'
}, {
  type: 'input',
  name: 'npmOrganization',
  message: 'Enter your npm organization',
  default: ''
}, {
  type: 'input',
  name: 'npmToken',
  message: 'Enter your npm token'
}]

const goodBye = function (dirname = false) {
  console.log('\x1B[0m')
  console.log('\x1B[32mDone!\x1B[0m')
  console.log('\x1B[96mHappy coding!\x1B[0m')
  console.log('\x1B[0m')
}

const installAndTest = async function (dirname = false) {
  const spinner = ora('\x1B[96m2/3 Installing...\x1B[0m').start()
  const params = {}
  if (dirname) params.cwd = dirname // set cwd only when dirname is valid
  await promiseExec('npm i', params)
  spinner.stop()

  const spinner2 = ora('\x1B[96m3/3 Testing...\x1B[0m').start()
  await promiseExec('npm run test', params)
  spinner2.stop()
}

const replaceInFiles = (thePath, filesArray, libName, githubUsername, npmToken, npmOrganization) => {
  const replace = require('replace-in-file')
  const options = []

  const files = []
  filesArray.forEach(elem => {
    files.push(thePath + '/' + elem)
  })

  options.push({
    files,
    from: /lib-template-temp-name-must-replace/g,
    to: libName
  })

  options.push({
    files,
    from: /\[\[THE_DATE\]\]/g,
    to: getFormattedDate()
  })

  options.push({
    files,
    from: /\[\[YOUR_GITHUB_USERNAME_HERE\]\]/g,
    to: githubUsername
  })

  options.push({
    files,
    from: /\[\[YOUR_NPM_TOKEN_GOES_HERE\]\]/g,
    to: npmToken
  })

  options.push({
    files,
    from: /\[\[YOUR_NPM_ORGANIZATION_GOES_HERE\]\]/g,
    to: npmOrganization
  })

  const executeChanges = async (options) => {
    try {
      for (const option of options) {
        await replace(option)
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  executeChanges(options)
}

const goLibGo = async function (outPath, answers) {
  console.log(logoText)
  // just a workaround for the message `No change to package.json was detected. No package manager install will be executed.`
  await wait(200)

  // const answers = await inquirer.prompt(questions) // prompt
  let camelcaseName = kebabCase(answers.camelcaseName)
  const camelcaseNameOriginal = camelcaseName // save it so it can be replaced-in-files later
  const { githubUsername, npmToken, npmOrganization } = answers

  const defaultDir = getCurrentDir(process.cwd())
  const isDefaultDir = (answers.camelcaseName === defaultDir)
  if (isDefaultDir) camelcaseName = ''

  const spinner = ora('\x1B[96m1/3 Copying files...\x1B[0m').start()

  await fsExtra.ensureDir(path.join(outPath, camelcaseName))
  await fsExtra.copy(path.join(__dirname, 'template'), path.join(outPath, camelcaseName))

  await replaceInFiles(path.join(outPath, camelcaseName), ['package.json', 'package-lock.json', 'CHANGELOG.md', 'README.md', 'README-GITHUB.md', '.npmrc'], camelcaseNameOriginal, githubUsername, npmToken, npmOrganization)
  await replaceInFiles(path.join(outPath, camelcaseName, 'scripts'), ['*.sh'], camelcaseNameOriginal, githubUsername, npmToken, npmOrganization)

  spinner.stop()

  if (isDefaultDir) {
    await installAndTest()
  } else {
    await installAndTest(camelcaseName)
  }

  // end
  goodBye()
}
