const path = require('path')
const { ModuleFederationPlugin } = require('webpack').container;

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name]_[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 3002,
    open: false,
    host: 'localhost',
    hot: true
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remote',
      library: { type: 'var', name: 'remote'},
      filename: 'remote.js',
      exposes: {
        './Button': './src/button.js'
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true }}
    }),
    new HtmlWebpackPlugin({
      template: './remote.html',
      scriptLoading: 'blocking',
    })
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }
      }
    ]
  },
}