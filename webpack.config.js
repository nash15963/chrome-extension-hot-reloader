const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
        {
            test: /\.js|jsx$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        ['@babel/preset-react', {"runtime": "automatic"}]
                    ],
                }
            }
        },
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
        },
        {
            test: /\.svg$/i,
            use: [
                {
                    loader: 'svg-url-loader',
                    options: {
                        limit: 10000,
                    },
                },
            ]
        }
    ]
},
    plugins :[
        new MiniCssExtractPlugin() ,
        new HtmlWebpackPlugin({
            template : "./public/index.html",
            filename : "popup.html",
        }) ,
        new CopyPlugin({
            patterns: [
                {
                    from: "public",
                },
            ],
        }),
    ]
};

// npm install babel-loader @babel/core @babel/preset-env @babel/preset-react
// npm install mini-css-extract-plugin  // add plugins
// npm i svg-url-loader

// npm install --save-dev html-webpack-plugin
// npm install copy-webpack-plugin --save-dev

// 
// https://www.youtube.com/watch?v=eN5eomaACDk&t=138s   // hot reload
