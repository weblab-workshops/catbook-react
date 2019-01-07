const path = require('path');
const entryFile = path.resolve(__dirname, 'src', 'client', 'index.js');
// const outputDir = path.resolve(__dirname, 'src', 'client', 'dist');

const webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', entryFile],
  output: {
    path: __dirname + '/src/client/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {

    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './src/client/dist',
    hot: true,
    proxy: {
      '/api': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
      '/logout': 'http://localhost:3000'
    }
  }
};