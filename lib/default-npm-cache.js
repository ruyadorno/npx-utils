const isWindows = process.platform === 'win32'
const cacheRoot = (isWindows && process.env.LOCALAPPDATA) || '~'
const cacheExtra = isWindows ? 'npm-cache' : '.npm'
const cache = `${cacheRoot}/${cacheExtra}`

module.exports = cache
