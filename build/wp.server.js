const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const baseConfig = require('./wp.base')

module.exports = merge(baseConfig, {
  target: 'node',
  entry: path.resolve(__dirname, '../client/server-entry.js'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'js/server-build.js'
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: "vue-style-loader",
          use: [
            'css-loader',
            'stylus-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("css/[name].css"),
    new VueServerPlugin("css/[name].css")
  ]
})