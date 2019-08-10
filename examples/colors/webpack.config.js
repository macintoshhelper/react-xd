const path = require('path');

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  entry: './src/main.js',
  mode,
  output: {
    path: __dirname,
    filename: 'main.js',
    libraryTarget: 'commonjs2',
  },
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    alias: {
      'react-xd': path.resolve(__dirname, '../../src/'),
    },
  },
  externals: {
    scenegraph: 'scenegraph',
    commands: 'commands',
  },
};
