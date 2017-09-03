const path = require('path');

module.exports = {
  devtool: process.env !== 'PRODUCTION' ? '#cheap-module-source-map' : false,
  entry: {
    '1_quickstart': [
      'babel-polyfill',
      './demos/1_quickstart/index.js',
    ],
    '2_barebones': [
      'babel-polyfill',
      './demos/2_barebones/index.js',
    ],
  },
  resolve: {
    alias: {
      'react-geoinput': path.resolve(__dirname, 'src/index.js'),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'demos'),
  },
  output: {
    filename: '[name]/bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'demos'),
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          { loader: 'postcss-loader' },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
