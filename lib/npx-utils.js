const fs = require('fs')
const { basename, resolve } = require('path')
const { promisify } = require('util')
const reopenTTY = require('reopen-tty')
const ipt = require('ipt')
const rpj = require('read-package-json-fast')
const trash = require('trash')
const chalk = require('chalk')
const cacheInstallDir = require('libnpmexec/lib/cache-install-dir.js')
const npxFolderName = '_npx'

const readNpxPackages = async ({ cache }) => {
  const npxFolderLocation = resolve(cache, npxFolderName)
  const dirs = fs.readdirSync(npxFolderLocation)
  const res = []

  for (const dirName of dirs) {
    try {
      const dir = resolve(npxFolderLocation, dirName)
      const { dependencies } = await rpj(resolve(dir, 'package.json'))
      const label = Object.entries(dependencies)
        .reduce((res, [name, version]) => {
          const id = `${name}@${version}`
          return res ? `${res} + ${id}` : id
        }, '')
      res.push({
        dir,
        label
      })
    } catch (e) {
      if (process.env.NPX_UTILS_DEBUG)
        console.error(`unreadable location: ${dir}`)
    }
  }
  return res
}

const _interactive = async ({ cache }) => {
  const pkgs = await readNpxPackages({ cache })
  const input = pkgs.map(i => ({ name: i.label, value: i.dir }))

  const stdout = await promisify(reopenTTY.stdout)()
  const selectedItems = await ipt(input, {
    stdout
  }, {})
  return selectedItems
}

const interactive = async ({ cache }) => {
  const [selectedItem] = await _interactive({ cache })
  console.log(selectedItem)
}

const interactiveRemove = async ({ cache }) => {
  const selectedItems = await _interactive({ cache })
  await trash(selectedItems)
}

const list = async ({ cache }) => {
  const pkgs = await readNpxPackages({ cache })

  for (const pkg of pkgs)
    console.log(chalk.reset(chalk.dim(basename(pkg.dir))), chalk.reset(pkg.label))
}

const remove = async ({ args, cache }) => {
  const location = cacheInstallDir({ cache, packages: args })
  await trash(location)
}

module.exports = {
  interactive,
  interactiveRemove,
  list,
  remove,
}
