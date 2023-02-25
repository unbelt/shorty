const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const app = require('./app.config');

console.log('USING DEVELOPMENT');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    performance: {
        hints: false,
    },
    entry: {
        app: `${app.dir.src}/main.ts`,
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js',
        publicPath: '',
    },
    devServer: {
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader', 'angular2-template-loader', 'source-map-loader'],
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
                use: 'file-loader?name=[name].[ext]',
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
    },
    plugins: [
        // function () {
        //     this.plugin('watch-run', function (watching, callback) {
        //         console.log('\x1b[33m%s\x1b[0m', `Begin compile at ${new Date().toTimeString()}`);
        //         callback();
        //     });
        // },
        new webpack.optimize.ModuleConcatenationPlugin(),

        new ESLintPlugin({
            extensions: ['ts'],
            fix: true,
        }),
        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            failOnError: true,
            onDetected({ paths, compilation }) {
                compilation.errors.push(new Error(paths.join(' -> ')));
            },
        }),
    ],
};
