import React from 'react';
import PropTypes from 'prop-types';

export default class Document extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { style, children } = this.props;

    return (
      <document style={{
        flexDirection: 'row',
        ...style,
      }}>
        {children}
      </document>
    );
  }
}
