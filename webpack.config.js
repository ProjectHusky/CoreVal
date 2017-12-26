let path = require('path');
let webpack = require('webpack');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'client'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
            
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            exclude: /node_modules/
        }]
    }
}