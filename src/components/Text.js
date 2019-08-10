// @flow
import React, { type Node as ReactNode } from 'react';

import StyleSheet from '../stylesheet';

type Props = {
  name: String,
  style: { [string]: string | number },
  children: ReactNode,
};

export default class Text extends React.Component<Props> {
  static defaultProps = {
    name: 'Text',
  };

  render() {
    const { name, style, children } = this.props;

    return (
      <text
        name={name}
        style={{
          fontSize: 16,
          ...(style && StyleSheet.flatten(style))
        }}
      >
        {children}
      </text>
    );
  }
}
