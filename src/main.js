// [1]
import React from 'react';
const { Rectangle, Color, RootNode } = require('scenegraph');
import { render } from './render';

import { Document, Artboard } from './components';

const Text = 'text';


const App = () => (
  <Document>
    <Artboard bg="green">
      <Text>Hello World</Text>
      <Text>Hello World 2</Text>
    </Artboard>
  </Document>
);

function renderToXd(selection, documentRoot) {
  // documentRoot.removeAllChildren();

  return render(<App />, documentRoot);
  // [3]
  // const newElement = new Rectangle();
  // newElement.width = 100;
  // newElement.height = 50;
  // newElement.fill = new Color('Purple');

  // // [4]
  // selection.insertionParent.addChild(newElement);
  // // [5]
  // newElement.moveInParentCoordinates(100, 100);
}

// [6]
export const commands = {
  render: renderToXd,
  test: () => {},
};
