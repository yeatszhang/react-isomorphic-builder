/**
 * Created by yichizhang on 16/3/31.
 */

const log = require('npmlog');
const React = require('react');
const ReactDOMServer = require('react-dom/server')
const path = require('path');
const fs = require('fs');

module.exports = function (opt) {
  if (__DEBUG__) {
    global.webpackIsomorphicTools.refresh();
  }
  var baseName = path.basename(opt.entry, '.js');
  console.log(baseName);
  const assets = global.webpackIsomorphicTools.assets();
  var Component = require(opt.entry);
  var html = ReactDOMServer.renderToString(React.cloneElement(Component, {
    scripts: [
      React.createElement('script', { src: assets.javascript.main || '' })
    ],
    stylesheets: [
      //React.createElement('link', { href: assets.main.styles || '' })
    ]
  }));

  var outPath = path.join(opt.outputdir, baseName + '.html');
  if (!fs.existsSync(opt.outputdir)) {
    fs.mkdirSync(opt.outputdir);
  }
  fs.writeFile(outPath, html, function (err) {
    if (err) {
      throw err;
    }
    log.info(outPath + '写入成功');
  });
}