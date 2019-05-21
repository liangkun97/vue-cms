var path = require("path")

var HtmlWebpackPlugin = require('html-webpack-plugin')

var VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: path.join(__dirname, './src/main.js'),
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './src/index.html'),
			filename: 'index.html'
		}),
		new VueLoaderPlugin()
	],
	module: {
		rules: [
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
			{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
			{ test: /\.(ttf|eot|woff|woff2|svg)$/, use: 'url-loader' },
			{ test: /\.(png|bmp|gif|jpg|jpeg)$/, use: 'url-loader' },
			{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.vue$/, use: 'vue-loader' }
		]
	},
	resolve: {
		alias: {
			"vue$": "vue/dist/vue.js"
		}
	}
}
