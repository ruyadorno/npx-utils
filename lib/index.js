#!/usr/bin/env node

const { execSync } = require('child_process')
const defaultCache = require('./default-npm-cache.js')
const npxUtils = require('./npx-utils.js')

let cache = defaultCache
try {
  cache = process.env.NPX_UTILS_CACHE ||
    String(execSync('npm config get cache')).trim()
} catch (e) {
  console.warn('cache value not found, defaulting to:', cache)
}

const argv = process.argv.slice(2)

for (const arg of argv) {
  if (arg.startsWith('-'))
    throw new Error('npx-utils supports no options')
}

const [cmd, ...args] = argv

switch (cmd) {
  case "list":
  case "ls":
    return npxUtils.list({ cache })
  case "iremove":
  case "irm":
    return npxUtils.interactiveRemove({ cache })
  case "remove":
  case "rm":
    return npxUtils.remove({ args, cache })
  case "help":
    return console.log(`Usage:
  npx-utils [cmd]

Commands:
  default:    Interactive list all pkgs, print path on selection
  list:       List all pkgs installed in npx scope
  remove:     Removes a previously pkg (must use exact name + version)
  iremove:    Interactive list all pkgs, removes it on selection
`)
  default:
    return npxUtils.interactive({ cache })
}
