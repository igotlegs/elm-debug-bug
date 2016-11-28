const path = require("path");
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const buildTarget = path.resolve(path.join(__dirname, '/dist'))
const clientSourceDir = path.resolve('./src/client')

module.exports = {
  resolve: {
    root: [clientSourceDir]
  },

  entry: [
    path.join(clientSourceDir, 'js/init/init.js')
  ],

  output: {
    path: buildTarget,
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test:    /\.html$/,
        exclude: /node_modules/,
        loader:  'file?name=[name].[ext]',
      },
      {
        test:    /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader:  'elm-hot!elm-webpack?debug=true',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      }
    ],

    noParse: /\.elm$/,
  },

  stats: {
    colors: true,
    chunks: false
  },

  plugins: [
    new CleanWebpackPlugin([buildTarget], {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

}
