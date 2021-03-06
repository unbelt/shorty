﻿const path = require('path');
const app = require('./app.config');

console.log('USING TEST');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',

    performance: {
        hints: false,
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['awesome-typescript-loader', 'angular2-template-loader', 'source-map-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                include: path.join(app.dir.src, 'styles'),
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.scss$/,
                exclude: path.join(app.dir.src, 'styles'),
                use: ['raw-loader', 'sass-loader'],
            },
            {
                test: /\.html$/,
                use: 'raw-loader',
            },
        ],
        exprContextCritical: false,
    },
};
