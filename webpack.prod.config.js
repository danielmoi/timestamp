const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    app: './client/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  postcssImport({
                    addDependencyTo: webpack,
                  }),
                  precss(),
                  autoprefixer(),
                ],
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ],
};
