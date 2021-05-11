const path = require('path');
const webpack = require('webpack');
const webpackTools = require('@ngtools/webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const app = require('./app.config');

console.log('USING PRODUCTION');

module.exports = {
    mode: 'production',
    entry: {
        app: `${app.dir.src}/main-aot.ts`,
    },
    output: {
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[id].[hash].chunk.js',
        publicPath: '',
    },
    devServer: {
        stats: 'minimal',
    },
    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                use: '@ngtools/webpack',
                parser: {
                    system: true,
                },
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
                use: 'file-loader?name=[name].[ext]',
                parser: {
                    system: true,
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                parser: {
                    system: true,
                },
            },
            {
                test: /\.scss$/,
                include: path.join(app.dir.src, 'styles'),
                use: ['style-loader', 'css-loader', 'sass-loader'],
                parser: {
                    system: true,
                },
            },
            {
                test: /\.scss$/,
                exclude: path.join(app.dir.src, 'styles'),
                use: ['raw-loader', 'sass-loader'],
                parser: {
                    system: true,
                },
            },
            {
                test: /\.html$/,
                use: 'raw-loader',
                parser: {
                    system: true,
                },
            },
        ],
    },

    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 244000,
            maxSize: 344000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 10,
            maxInitialRequests: 10,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        new webpackTools.AngularCompilerPlugin({
            tsConfigPath: `${app.dir.root}/tsconfig.aot.json`,
            entryModule: `${app.dir.src}/app/app.module#AppModule`,
        }),
        new UglifyJSPlugin({
            parallel: 2,
        }),
        // Show bundle report
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static',
        //     generateStatsFile: true,
        // }),
    ],
};
