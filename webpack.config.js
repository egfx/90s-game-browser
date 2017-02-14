'use strict';

const webpack = require('webpack');
const packageJson = require('./package.json');

module.exports = {
    entry: {
        app: './source/main.tsx',
        vendor: Object.keys(packageJson['dependencies']),
    },
    output: {
        path: 'build',
        filename: '[name].js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.ts', '.tsx', '.webpack.js', '.web.js'],
        alias: {
            'jquery-ui': './node_modules/jquery-ui-bundle/jquery-ui.js'
        }
    },
    module: {
        loaders: [
            { loader: 'json-loader', test: /\.json$/ },
            { loader: 'ts-loader', test: /\.tsx?$/, exclude: /node_modules/ },
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
};