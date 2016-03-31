/**
 * Created by yichizhang on 16/3/30.
 */
var webpack = require('webpack');
var webpackConfigDev = require('./webpack/webpack.config.dev.js');
var webpackConfigPro = require('./webpack/webpack.config.pro.js');
var html = require('./main.js');
var npmlog = require('npmlog');
var rimraf = require('rimraf');

/**
 *
 * @param opt.entry
 * @param opt.rootdir
 * @param opt.outputdir
 * @param opt.publicPath
 */
module.exports = function(opt) {
  // debug 环境
  if (process.env.NODE_ENV !== 'production') {
    var compiler = webpack(webpackConfigDev({
      rootdir: opt.rootdir,
      outputdir: opt.outputdir,
      entry: opt.entry,
      publicPath: opt.publicPath
    }));
    compiler.watch({
      aggregateTimeout: 300,
      poll: true

    }, function(err, stats) {
      npmlog.info(stats);
      html({
        entry: opt.entry,
        rootdir: opt.rootdir,
        outputdir: opt.outputdir
      });
    });
  } else {
    // 线上build
    rimraf.sync(opt.outputdir);
    var config = webpackConfigPro({
      rootdir: opt.rootdir,
      outputdir: opt.outputdir,
      entry: opt.entry,
      publicPath: opt.publicPath
    });
    webpack(config, function(err, stats) {
      npmlog.info(stats);
      html({
        entry: opt.entry,
        rootdir: opt.rootdir,
        outputdir: opt.outputdir
      })
    });
  }
}