const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Must be load file .env for dotenv configuration time
// to use to access data for devServer and another places
require('dotenv').config({path: __dirname + '/.env.production'});

module.exports = merge(common, {
  mode: 'production',    
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
    }),
    new HtmlWebpackPlugin({    
      title: 'Demonstration',  
      template: './public/index.html',
      favicon: './public/favicon.ico'      
    }),
    new webpack.EnvironmentPlugin( { ...process.env } )
  ]
});