/**
 * Created by yichizhang on 12/3/15.
 * node 服务入口文件，只能使用node支持的es6语法
 */
require('babel-register');
require('babel-polyfill');

const path = require('path');
const log = require('npmlog');

/**
 * Define isomorphic constants.
 */
  // NODE_ENV默认为development
process.env.NODE_ENV = process.env.NODE_ENV || 'debug';

// globals
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEBUG__ = process.env.NODE_ENV === 'debug';

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
module.exports = function (opt) {
  global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack-isomorphic-tools'))
    .development(global.__DEBUG__)
    .server(opt.rootdir, function () {
      // 需要等待global.webpackIsomorphicTools 生成
      process.nextTick(function() {
        require('./write')(opt);
      });
    });
}

