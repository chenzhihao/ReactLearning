var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var minifiedDeps = {
    'jquery': 'bower_components/jquery/dist/jquery.min.js'
};


config = {
    entry: [
        path.resolve(__dirname, 'app/main.js')],
    output: {
        path: path.resolve(__dirname, 'deploy'),
        filename: 'bundle.js',
        libraryTarget: 'umd',
        library: ['LMUI']
    },
    externals: {
        "react": {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        }
    },
    eslint: {
        configFile: '.eslintrc'
    },
    // resolve.alias and module.noParse will be injected as 'minifiedDeps'
    resolve: {
        alias: {}
    },
    module: {
        noParse: [],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['babel']
            },
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both loaders
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new HtmlWebpackPlugin({
            title: 'Zhihao\'s app',
            template: 'indexDeployTemplate.html',
            filename: 'index.html',
            inject: true
        })
    ]
};

for (var dep in minifiedDeps) {
    var depPath = path.resolve(minifiedDeps[dep]);
    config.resolve.alias[dep] = depPath;
    config.module.noParse.push(depPath);
}

module.exports = config;