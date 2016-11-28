const webpack = require('webpack')
const config = require('../../webpack.config')

function useHotReloading(app) {
  const compiler = webpack(config)

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: config.stats
  }))
  app.use(require("webpack-hot-middleware")(compiler))
}

module.exports = useHotReloading
