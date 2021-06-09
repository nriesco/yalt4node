const yeoman = require('yeoman-environment')
const program = require('commander')
const semver = require('semver')
const path = require('path')
const updateNotifier = require('update-notifier')
// const { upgrade } = require('@feathersjs/tools');

const NODE_MIN_VERSION = '10.0.0'
const meta = {
  lib: 'Create a new lib in the current folder'
}
const env = yeoman.createEnv()

Object.keys(meta).forEach(name => {
  const moduleName = path.join(__dirname, './generators/lib/')
  env.register(require.resolve(moduleName), `yalt4node:${name}`)
})

module.exports = function (argv, generatorOptions = {}) {
  const pkg = require(path.join(__dirname, 'package.json'))
  let description = 'Run a generator. Type can be\n'

  Object.keys(meta).forEach(name => {
    description += `\t• ${name} - ${meta[name]}\n`
  })

  updateNotifier({ pkg }).notify()

  program.version(pkg.version)
    .usage('upgrade <version>')
    .usage('generate [type]')

  if (!semver.satisfies(process.version, `>= ${NODE_MIN_VERSION}`)) {
    console.error(`Filete CLI and generated application requires Node v${NODE_MIN_VERSION} or later.`)
    return process.exit(1)
  }

  program.command('generate [type]')
    .alias('g')
    .description(description)
    .action(type => {
      if (!type) {
        program.help()
      } else {
        env.run(`yalt4node:${type}`, generatorOptions)
      }
    })

  // program.command('upgrade')
  //   .alias('u')
  //   .description('Try to automatically upgrade to the latest Filete version')
  //   .action(version => upgrade(process.cwd()));

  // program.command('*').action(() => program.help());
  program.parse(argv)

  if (argv.length === 2) {
    program.help()
  }
}
