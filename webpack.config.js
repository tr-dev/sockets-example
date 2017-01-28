const webpack = require('webpack');

module.exports = {
  entry: {
    main : './assets/js/app.js',
  },
  output: {
    filename: 'bundle.js',
    path: './static/js',
  },
  target : 'node',
  module : {
    loaders : [
      {
        test : /\.json$/,
        loader : 'json-loader'
      },
      {
        test : /\.js$/,
        loader : 'babel-loader',
        options: {
          moduleId : true

        },
        query :{
          presets : ['es2015']
        }
      }
    ]
  }
}
