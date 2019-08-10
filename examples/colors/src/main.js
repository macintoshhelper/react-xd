// [1]
import React from 'react';
const { Rectangle, Color, RootNode } = require('scenegraph');
import { render, Document, Artboard, Text, View } from 'react-xd';

const Swatch = ({ name, hex }) => (
  <View
    style={{
      margin: 24,
      borderRadius: 4,
      height: 250,
      width: 250,
      backgroundColor: hex,
      justifyContent: 'center',
      alignItems: 'center',
      }}
      name="Swatch"
    >
    <Text style={{ color: 'white', fontSize: 120 }}>
      &
    </Text>
    <Text style={{ color: 'white', paddingTop: 16, fontSize: 24 }}>{name}</Text>
  </View>
);

const App = ({ colors }) => (
  <Document>
    <Artboard
      style={{
        height: 2048,
        width: 1024,
        padding: 24,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
      name="Swatches"
    >
      {Object.keys(colors).map(color => (
        <Swatch key={color} name={color} hex={colors[color]} />
      ))}
    </Artboard>
    <Artboard
      name="Mobile"
      style={{
        marginLeft: 70,
        backgroundColor: 'green',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 20, color: 'white' }}>Hello World 3</Text>
      <Text>Hello World 4</Text>
      <View style={{ width: 360, height: 100, backgroundColor: 'white' }} />
      <View
        style={{
          width: 360,
          height: 100,
          backgroundColor: 'pink',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Centered Text</Text>
      </View>
    </Artboard>
  </Document>
);

function renderToXd(selection, documentRoot) {
  const colorList = {
    Classic: '#96324E',
    Neue: '#21304E',
    Violet: 'violet',
    Navy: '#000075',
    Maroon: '#800000',
  };

  documentRoot.removeAllChildren();

  return render(<App colors={colorList} />, { selection, documentRoot });
}

// [6]
export const commands = {
  render: renderToXd,
  test: () => {},
};
