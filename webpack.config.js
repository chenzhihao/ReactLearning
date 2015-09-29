var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');


var minifiedDeps = {
    'jquery': 'bower_components/jquery/dist/jquery.min.js'
};


config = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.js')],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
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
        preLoaders: [
            {test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules|bower_components/}
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['react-hot', 'babel']
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
        new HtmlWebpackPlugin({
            title: 'Zhihao\'s app',
            template: 'indexTemplate.html',
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