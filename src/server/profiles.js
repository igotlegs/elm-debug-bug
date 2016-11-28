const argv = require('yargs').argv

module.exports = {
  isDebug: () => {
    return argv.profile === 'debug'
  },
  isDev: () => {
    return argv.profile === 'development'
  },
  isProd: () => {
    return argv.profile === 'production'
  },
  get: () => {
    return argv.profile
  }
}
