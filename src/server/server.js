const express = require('express')
const argv = require('yargs').argv
const proxy = require('./http-proxy')
const logger = require('./logger')
//const mockDataProvider = require('./mock-data-provider')
const profiles = require('./profiles')


const defaultConfig = {
  port: 9000,
  proxyInterceptPath: '/proxy',
  staticDir: 'dist'
}

function startServer(config) {
  const app = express()
  app.locals.config = config

  if(argv.useMockData) {
    //app.use(config.proxyInterceptPath, mockDataProvider)
  } else {
    app.use(config.proxyInterceptPath, proxy())
  }
  if(profiles.isDev()) {
    const useHotReloading = require('./use-hot-reloading')
    useHotReloading(app)
  }

  app.use(express.static(config.staticDir))
  app.use(logger.setup({logDirectory: config.logDirectory}))
  app.listen(config.port)

  console.log(`Using profile: ${profiles.get()}`)
  console.log(`Server listening at http://localhost:${config.port}`)
}

module.exports = {
  setup: (config) => {
    startServer(Object.assign({}, defaultConfig, config))
  },
  defaultConfig
}
