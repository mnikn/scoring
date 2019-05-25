const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

module.exports = {
  entry: './examples/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'examples-dist')
  },
  module: {
		rules: [
		
		{
			test: /\.ts$/,
			loader: 'awesome-typescript-loader'
		},
		{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
      static: path.resolve(__dirname, 'static/')
    },
    extensions: ['.js', '.ts',]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'examples-dist'),
    compress: true
  },
	plugins: [
		new HtmlWebpackPlugin({
      template: "./examples/index.html"
		}),
		new webpack.ProvidePlugin({
			$: 'jquery'
		})
  ]
};