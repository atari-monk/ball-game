const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') // Add this line
const { SourceMapDevToolPlugin } = require('webpack') // For source maps

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/, // Add this rule for HTML files
        use: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'atari-monk-ball-game.[contenthash].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './package.json', to: './' },
        { from: './config.json', to: './' },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html', // Path to your HTML template
    }),
    new SourceMapDevToolPlugin(), // Add this line for source maps
  ],
  stats: { errorDetails: false },
}
