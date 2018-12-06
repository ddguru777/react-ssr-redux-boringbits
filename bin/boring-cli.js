#!/usr/bin/env node
const fs_extra = require('fs-extra');
const path = require('path')
const paths = require('../dist/node_modules/paths')
const child_process = require('child_process')
const fs = require('fs');

let ran = false;

function makeCmd(mod) {
  return function exec(argv) {
    ran = true;
    require('./' + mod)(argv)
      .then((result = {status: 1}) => {
        process.exit(result.status);
      })
      .catch(e => {
        process.exit(1);
      })
  }
}

require('yargs')
  .usage('$0 <cmd> [cmd-args]')
  .command('type-check', 'Runs tsc against your projects TypeScript', makeCmd('boring-tsc'))
  .command('tsc', '(Alias for type-check)', makeCmd('boring-tsc'))
  .command('build-client', 'Run webpack on your project\'s web client', makeCmd('build-client'))
  .command('build-node', 'Babel (ES7 + TypeScript) on your project\'s server', makeCmd('build-node'))
  .command('up', 'Run `docker-compose up` to launch infrastructure such as reverse proxy', makeCmd('docker-compose-up'))
  .command('down', 'Run `docker-compose down` to tear down infrastructure', makeCmd('docker-compose-down'))
  .demandCommand(1)
  .help()
  .argv;

if (!ran) {
  console.log('No valid <cmd> given, please run `boring help` for a list of commands');
}
