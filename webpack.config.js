const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: 'lib/',
    path: path.resolve(__dirname, 'lib'),
    filename: 'react-geoinput.js',
    sourceMapFilename: 'react-geoinput.map',
    library: 'react-geoinput',
    libraryTarget: 'commonjs'
  },
  externals: {
    'react': 'react',
    'react-redux': 'react-redux',
    'redux-saga': 'redux-saga',
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
        query: {
          plugins: ['transform-runtime'],
        },
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
