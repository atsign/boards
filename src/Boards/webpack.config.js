var webpack = require('webpack');

module.exports = {
    entry: './wwwroot/js/script.js',
    output: {
        path: './wwwroot/js',
        filename: 'script.bundle.js',
        publicPath: '/js/'
    },
    resolve: {
        modulesDirectories: ['./wwwroot/js'],
        alias: {
            'jquery': 'lib/jquery.min',
            'angular': 'lib/angular.min'
        }
    },
    module: {
        loaders: [
            { test: /angular.min/, loader: 'exports?angular' },
        ]
    }
}