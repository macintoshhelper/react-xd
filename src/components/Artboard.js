// @flow
import * as React from 'react';

import StyleSheet from '../stylesheet';

// $FlowFixMe
export default class Artboard extends React.Component {
  static defaultProps = {
    name: 'Artboard',
  };

  render() {
    const { name, bg, width, height } = this.props;
    // console.log({ flattenedStyles: StyleSheet.flatten(this.props.style) });
    return (
      <artboard name={name} bg={bg} width={width} height={height} name={this.props.name}>
        {this.props.children}
      </artboard>
    );
  }
}
