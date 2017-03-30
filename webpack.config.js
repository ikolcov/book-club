const path = require('path');

module.exports = {
  // the entry file for the bundle
  entry: path.join(__dirname, '/src/client/app'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/dist/client/js'),
    filename: 'app.js',
  },

  module: {
    // apply loaders to files that meet given conditions
    loaders: [
      {
        test: /\.scss$/,
        include: path.join(__dirname, '/src/client'),
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]__[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '/src/client'),
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
};
