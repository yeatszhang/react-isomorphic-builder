var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));
var webpackBase = require('./webpack.config.base');
var merge = require('webpack-merge');

module.exports = function (opt) {
  var baseName = path.basename(opt.entry, '.js');
  return merge(webpackBase(opt), {
    output: {
      filename: baseName + '-[hash].js'
    },
    devtool: 'source-map',
    plugins: [
      new CleanPlugin([opt.outputdir]),
      new ExtractTextPlugin('[name]-[contenthash].css', { allChunks: true }),
      new webpack.DefinePlugin({
        __DEBUG__: false,
        __CLIENT__: true,
        __SERVER__: false,
        'process.env': {
          // Useful to reduce the size of client-side libraries, e.g. react
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: true
        },
      }),
      webpackIsomorphicToolsPlugin
    ],
    module: {
      loaders: [{
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=10240'
      }, {
        test: /\.module.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules')
      }, {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('style', 'css'),
        exclude: /\.module.css$/,
      }]
    }
  });
}
