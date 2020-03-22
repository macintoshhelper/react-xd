# React XD

Render React components to Adobe XD. This can be used for React cross-platform UI libraries and for creating design systems. The (incomplete) API is based off React Native/`react-primitives`

This is a **proof of concept** for testing and feedback purposes. **Please** do not use in **production** systems.

[![npm](https://img.shields.io/npm/v/react-xd.svg)](https://www.npmjs.com/package/react-xd)
[![npm](https://img.shields.io/npm/dt/react-xd.svg)](https://www.npmjs.com/package/react-xd)

> Inspired by [react-sketchapp](https://github.com/airbnb/react-sketchapp)

![Screenshot Preview](./docs/screenshot.jpg)


## Getting Started

### Requirements
  - [Adobe XD (Free, requires sign-up)](https://www.adobe.com/uk/products/xd.html)
  - [Node.js & npm (can install with nvm)](https://github.com/nvm-sh/nvm#installation-and-update)

### Dependency Installation

Please refer to `examples/colors` for reference.

1. Initialise a repository or folder

```sh
mkdir design-system && cd $_
npm init -y
```

2. `npm` install your developer dependencies

```sh
npm install --save-dev @adobe/xdpm @babel/cli @babel/core @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-flow @babel/preset-react babel-loader webpack webpack-cli
```

3. Install `react-xd` and the required external dependencies

```sh
npm install --save react-xd react@16.9.0
```

### Code Setup

4. Refer to [`examples/colors`](./examples/colors) for the webpack setup. You need a `manifest.json` and `main.js` entry point for the Adobe XD plugin. You need a build system such as webpack to compile the jsx with Babel into `main.js`

`src/main.js` example:

```jsx
import { render, Document, View, Text } from 'react-xd';

const App = () => (
  <Document>
    <Artboard
      name="Artboard"
      style={{
        height: 640,
        width: 360,
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          width: 360,
          height: 100,
          backgroundColor: 'purple',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>
          Hello World!!!
        </Text>
      </View>
    </Artboard>
  </Document>
);

function renderToXd(selection, documentRoot) {
  documentRoot.removeAllChildren(); // Resets document

  return render(<App />, { selection, documentRoot });
}


export const commands = {
  render: renderToXd,
  test: () => {}, // Hack to make XD show a menu with the render option instead of a single button
};
```

## Credit
- [react-sketchapp](https://github.com/airbnb/react-sketchapp) – inspired this project, and some bits of code are borrowed from it.
  - MIT License
  - Copyright (c) 2018 Airbnb

## Contributing

Please post an issue offering any feedback or help! Thanks!
