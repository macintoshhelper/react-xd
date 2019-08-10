// @flow
import React, { type Node as ReactNode } from 'react';

import StyleSheet from '../stylesheet';

type Props = {
  name: String,
  style: { [string]: string | number },
  children: ReactNode,
};

export default class View extends React.Component<Props> {
  static defaultProps = {
    name: 'View',
  };

  render() {
    const { name, style, children } = this.props;

    return (
      <view
        name={name}
        style={{
          flexDirection: 'column',
          ...(style && StyleSheet.flatten(style))
        }
      }>
        {children}
      </view>
    );
  }
}
