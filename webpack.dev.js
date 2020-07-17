const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

// Must be load file .env for dotenv configuration time
// to use to access data for devServer and another places
require('dotenv').config({path: __dirname + '/.env.development'});

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    // Specify for response header
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      },
      port: 3000,
      open: true,
      proxy: {
      }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Demonstration - Development',
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new webpack.EnvironmentPlugin( { ...process.env } )  
  ]
});