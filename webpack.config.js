var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ROOT_PATH = path.resolve(__dirname)
var APP_PATH = path.resolve(ROOT_PATH, 'app')
var BUILD_PATH =  path.resolve(ROOT_PATH, 'build')
module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'index.jsx')
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: BUILD_PATH,
    compress: true,
    port: 8088,
    host: "localhost",
  },
  module: {
      rules: [
          {
              test: /\.(jsx|js)$/,
              exclude: /node_modules/,
              use: {
                  loader: "babel-loader"
              }
          },
          {
              test: /\.html$/,
              use: [
                  {
                      loader: "html-loader",
                      options: { minimize: true }
                  }
              ]
          }
      ]
  },
  resolve: {
    extensions: ['.js', 'jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My react app',
      template: path.resolve(APP_PATH, 'index.html'),
      filename: path.resolve(BUILD_PATH, 'index.html'),
    })
  ]
}