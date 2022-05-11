const path = require('path')

const deps = require('./package.json').devDependencies;

const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin')

function getRemoteEntryUrl(port) {
  const { CODESANDBOX_SSE, HOSTNAME = '' } = process.env
  if (!CODESANDBOX_SSE) {
    return `http://localhost:${port}`
  }
  const parts = HOSTNAME.split('-')
  const codesandboxId = parts[parts.length - 1]

  return `//${codesandboxId}-${port}.sse.codesandbox.io/remote.js`
}

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name]_[hash].js',
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    port: 3001,
    open: false,
    host: 'localhost',
    hot: true
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        remote: `remote@${getRemoteEntryUrl(3002)}/remote.js`
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true, requiredVersion: deps['react-dom'] }}
    }),
    new HtmlWebpackPlugin({
      template: './host.html',
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