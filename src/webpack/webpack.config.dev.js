var path = require('path');
var webpack = require('webpack');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools')).development();
var webpackBase = require('./webpack.config.base');
var merge = require('webpack-merge');

module.exports = function (opt) {
  var baseName = path.basename(opt.entry, '.js');
  return merge(webpackBase(opt), {
    output: {
      filename: baseName + '.js'
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        __DEBUG__: true,
        __CLIENT__: true,
        __SERVER__: false
      }),
      webpackIsomorphicToolsPlugin
    ],
    module: {
      loaders: [{
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=10240'
      }, {
        test: /\.module.css$/,
        loader: 'style!css?modules&localIdentName=[path][name]---[local]---[hash:base64:5]'
      }, {
        test: /\.css$/,
        loader: 'style!css',
        exclude: /\.module.css$/,
      }]
    }
  });
}

