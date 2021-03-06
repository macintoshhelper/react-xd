// @flow
import React, { type Node as ReactNode } from 'react';

import StyleSheet from '../stylesheet';

type Props = {
  name: String,
  style: { [string]: string | number },
  children: ReactNode,
};

export default class Artboard extends React.Component<Props> {
  static defaultProps = {
    name: 'Artboard',
  };

  render() {
    const { name, style, children } = this.props;

    return (
      <artboard
        name={name}
        style={{
          width: 360,
          height: 640,
          ...style,
        }}
      >
        {children}
      </artboard>
    );
  }
}
