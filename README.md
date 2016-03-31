# react-isomorphic-builder

通过一个入口，根据 react element 生成 html 文件以及 assets 的 react 同构开发构建工具。

## example

### entry 代码

```js
import React from 'react';
import './test.css';

class Page extends React.Component {
  render() {
    return (
      <html>
      <head>
        {this.props.stylesheets}
      </head>
      <body>
      hellow world
      {this.props.scripts}
      </body>
      </html>
    );
  }
}

// 在 node 环境返回需要 build 的 react element
if (typeof window === 'undefined') {
  module.exports = <Page />;
} else {
// browser 执行代码，一般包含 React.render
  React.render(<Page />, document.body);
}
```

### 构建代码

```js
var builder = require('react-isomorphic-builder');
var path = require('path');

builder({
  rootdir: __dirname,	// 工作目录
  entry: path.join(__dirname, './src/index.js'), // 入口文件绝对路径
  outputdir: path.join(__dirname, 'dist'), // 输出文件目录绝对路径
  publicPath: 'localhost:3000://public/'		// 静态资源路径
})
```

### 生成文件

**html**

```html
<html data-reactid=".cy5ydv2j28" data-react-checksum="-477137466">
<head data-reactid=".cy5ydv2j28.0">
  <link href="public/main-4eb9f8b0956638f2a89c102395c475ad.css" data-reactid=".cy5ydv2j28.0.0"/>
</head>
<body data-reactid=".cy5ydv2j28.1"><span data-reactid=".cy5ydv2j28.1.0">hellow world</span>
<script src="public/index-2094e7c123c437b38cab.js" data-reactid=".cy5ydv2j28.1.1:0"></script>
</body>
</html>
```

#### 打包好的静态资源

`main-4eb9f8b0956638f2a89c102395c475ad.css`  `index-2094e7c123c437b38cab.js`  

#### 构建完成的文件目录

```
.
├── dist
│   ├── index-2094e7c123c437b38cab.js
│   ├── index-2094e7c123c437b38cab.js.map
│   ├── index.html
│   ├── index.js
│   ├── main-4eb9f8b0956638f2a89c102395c475ad.css
│   └── main-4eb9f8b0956638f2a89c102395c475ad.css.map
├── package.json
├── src
│   ├── index.js
│   └── test.css
├── webpack-assets.json
└── worker.js
```