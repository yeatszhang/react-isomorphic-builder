/**
 * Created by yichizhang on 16/3/30.
 */

var builder = require('../src/index');
var path = require('path');

builder({
  rootdir: __dirname,
  entry: path.join(__dirname, './src/index.js'),
  outputdir: path.join(__dirname, 'dist'),
  publicPath: 'public/'
})