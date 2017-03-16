const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: "./src/index.tsx", // Point to main file
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js"
	},
	resolve: {
		extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
	},
	performance: {
		hints: false
	},
	module: {
		loaders: [
			{
				test: /\.tsx?$/, 						  // All ts and tsx files will be process by
				loaders: [ 'babel-loader', 'awesome-typescript-loader' ], // babel-loader transforms jsx until typescript can do inferno style
				exclude: /node_modules/                   // ignore node_modules
			}, {
				test: /\.jsx?$/,                          // all js and jsx files will be processed by
				loader: 'babel-loader',                   // babel-loader
				exclude: /node_modules/                  // ignore node_modules
			}, {
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
                	use: 'css-loader'
            	})
			}
		]
	},
	devServer: {
		contentBase: "dist/",
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin(
			{
				template: "./src/index.html",
				inject: "body"
			}
		),
		new CleanWebpackPlugin(
			["dist"], {
				verbose: true
			}
		),
		new ExtractTextPlugin('main.css'),
		// By default, webpack does `n=>n` compilation with entry files. This concatenates
		// them into a single chunk.
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};
