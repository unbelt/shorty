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
                use: ['awesome-typescript-loader', 'angular2-template-loader', 'source-map-loader'],
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
        new webpack.optimize.ModuleConcatenationPlugin(),

        // {
        //     config: `${app.dir.root}/.eslintrc.json`,
        //     files: [`${app.dir.src}/**/*.ts`],
        //     warningsAsError: true,
        //     fix: true,
        //     typeCheck: true,
        // }
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
