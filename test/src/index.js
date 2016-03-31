/**
 * Created by yichizhang on 16/3/30.
 */
import React from 'react';
import './test.css';
import './test.js';
class Component extends React.Component {
  render() {
    return (
      <div>
        hellow world
        {this.props.scripts}
      </div>
    );
  }
}

if (typeof window === 'undefined') {
  module.exports = <Component />;
} else {
  React.render(<Component />, document.body);
}