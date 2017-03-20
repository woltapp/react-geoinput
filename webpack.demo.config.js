const path = require('path');

module.exports = {
  devtool: process.env !== 'PRODUCTION' ? '#cheap-module-source-map' : false,
  entry: {
    demo: [
      'babel-polyfill',
      './demo/index.js',
    ],
  },
  resolve: {
    alias: {
      'react-geoinput': path.resolve(__dirname, 'src/index.js'),
    },
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'demo'),
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
