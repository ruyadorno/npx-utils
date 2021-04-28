# npx-utils

[![npm version](https://img.shields.io/npm/v/npx-utils.svg)](https://npm.im/npx-utils)
[![license](https://img.shields.io/npm/l/npx-utils.svg)](https://npm.im/npx-utils)
[![GitHub Actions](https://github.com/ruyadorno/npx-utils/workflows/node-ci/badge.svg)](https://github.com/ruyadorno/npx-utils/actions?query=workflow%3Anode-ci)

Manages packages installed to the npx-space :space_invader:

## What does that mean?

In **npm@7** when using either `npx` or the new `npm exec` command, any
package that is not found in the local `node_modules` folder or in your global
`node_modules` folder, will be installed to a special **npx** space that lives
inside **npm** internal cache folder.

`npx-utils` is a small cli tool that helps with managing things that are
installed in this **npx** space by providing commands to list the folders in
which packages are installed to and an interactive interface to remove them.

## Install

You may install it globally:

```sh
$ npm i -g npx-utils
```

or simply run it using **npx**: `npx npx-utils`

## Usage

If no argument is provided, the cli will display an interactive menu and
print the directory of the selected item to the standard output.

### List

Lists all folders currently in your **npx** space:

```sh
$ npx-utils ls
```

### iRemove

Builds an interactive list of all folders currently in your **npx** space and
moves the selected item to the OS system trash.

```sh
$ npx-utils irm
```

### Remove

Allows you to remove a previously install to the **npx** space, there's a
gotcha using this command, which is that you need to provide it the exact same
items as passed to `npx` (or `npm exec`). For example if you used a specific
version e.g: `npx ipt@3.2.0` you need to run `npx npx-utils rm ipt@3.2.0` in
order to remove that previous install.

```sh
$ npx-utils rm <pkg>
```

## More ideas

You can also combine the information provided by `npx-utils` with other tools
in order to create even more useful workflows:

### Uses npm ls to list packages installed to a specific space:

```sh
$ npm ls --all --prefix $(npx-utils)
? Select an item: semver@^7.3.4
a9bef924e4cb6cdb@ /Users/ruyadorno/.npm/_npx/a9bef924e4cb6cdb
└─┬ semver@7.3.4
  └─┬ lru-cache@6.0.0
    └── yallist@4.0.0
```

## Help

```
Usage:
  npx-utils [cmd]

Commands:
  default     Interactive list all pkgs, print path on selection
  help        Prints this help message
  list        List all pkgs installed in npx scope
  iremove     Interactive list all pkgs, removes it on selection
  remove      Removes a previously pkg (must use exact name + version)
  version     Prints the running version of npx-utils

```

## License

MIT

