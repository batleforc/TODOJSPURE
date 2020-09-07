const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry:{
    app:[
        'webpack-hot-middleware/client',
          './src/index.js',
      ]
  },
  devtool:'inline-source-map',
  devServer:{
    contentBase: './dist',
    hot:true
  },
  output:{
    publicPath:"/"
  },
  plugins:[
      new webpack.HotModuleReplacementPlugin()
  ]
});