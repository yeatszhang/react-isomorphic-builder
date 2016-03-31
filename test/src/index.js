/**
 * Created by yichizhang on 16/3/30.
 */
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

if (typeof window === 'undefined') {
  module.exports = <Page />;
} else {
  React.render(<Page />, document.body);
}