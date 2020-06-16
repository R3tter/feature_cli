const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      utils: path.resolve(__dirname, 'src/utils/')
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'library-name',
    libraryTarget: 'umd'
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './package.json', to: path.resolve(__dirname, 'dist') },
        { from: './README.md', to: path.resolve(__dirname, 'dist') }
      ]
    })
  ]
};