#!/usr/bin/env node
const commander = require('commander')
const createReducer = require('./reducer')
const generateView = require('./view')

function generate() {
  commander
    .command('generate [type] [name]') // sub-command name
    .alias('g') // alternative sub-command is `al`
    .option('-r, --root [root]', 'Root folder redux', 'redux')
    .option('-v, --view [view]', 'Root folder view', 'features')
    .option('-n, --navigation [navigation]', 'Root folder navigation', 'navigation')
    .option('-nt, --navigation-type [navigationtype]', '', 'stack')
    .option('-mn, --main-stack [mainstack]', '', 'MainStack')
    .option('-nr, --routes [route]', '', 'routes')
    .description('No thing') // command description

    // function to execute when command is uses
    .action((type, name, { root, view, navigation }) => {
      switch (type) {
        case 'reducer':
          createReducer(name, root)
          break
        case 'view':
          generateView(name, root, view, navigation)
          break

        default: {
          console.log('Type not support'.red)
          break
        }
      }
    })

  commander.parse(process.argv)
}

generate()
