var path = require("path");
var webpack = require("webpack");

var plugins = [
	new webpack.ProvidePlugin({
		$: "jquery",
		jQuery: "jquery",
		"window.jQuery": "jquery"
	})
];

module.exports = {
	context: __dirname,
	entry: {
		javascript: "./app.js"
	},
	
	output: {
		filename: "index.min.js",
		path: __dirname + "/../public"
	},
	
	node: {
		fs: "empty",
		child_process: "empty"
	},
	
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query:{
					presets:['es2015', 'react']
				}
			}
		]
	},
	resolve: {
		alias: {
			'react': path.resolve(__dirname,"../node_modules/react/")
		}
	},
	plugins: plugins
};
