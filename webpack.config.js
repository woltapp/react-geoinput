const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    publicPath: 'lib/',
    path: path.resolve(__dirname, 'lib'),
    filename: 'react-geoinput.js',
    sourceMapFilename: 'react-geoinput.js.map',
    library: 'react-geoinput',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'react-redux': 'react-redux',
    'redux-saga': 'redux-saga',
    'react-debounce-input': 'react-debounce-input',
    'react-display-name': 'react-display-name',
    'classnames': 'classnames',
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
              localIdentName: 'react-geoinput___[name]__[local]',
            },
          },
          { loader: 'postcss-loader' },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
