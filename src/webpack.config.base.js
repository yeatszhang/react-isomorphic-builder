var path = require('path');
var webpack = require('webpack');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools')).development();

module.exports = function(opt) {
  return {
    context: path.join(opt.rootdir),
    entry: opt.entry,
    output: {
      path: path.join(opt.outputdir),
      publicPath: opt.publicPath
    },
    resolve: {
      root: opt.rootdir,
      modulesDirectories: [
        'src',
        'node_modules'
      ],
      extensions: ['', '.json', '.js', '.jsx']
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [{
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=10240'
      }, {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
      }]
    }
  }
}

