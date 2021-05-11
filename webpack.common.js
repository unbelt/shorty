const rxPaths = require('rxjs/_esm5/path-mapping');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const app = require('./app.config');

module.exports = {
    entry: {
        polyfills: `${app.dir.src}/polyfills.ts`,
    },
    output: {
        path: app.dir.wwwRoot,
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.json'],
        alias: rxPaths(),
        fallback: { path: require.resolve('path-browserify') },
    },
    devServer: {
        historyApiFallback: true,
        contentBase: app.dir.wwwRoot,
    },
    module: {
        exprContextCritical: false,
    },
    plugins: [
        new CleanWebpackPlugin({
            root: app.dir.wwwRoot,
            cleanOnceBeforeBuildPatterns: ['**/*', '!*.ico'],
            cleanAfterEveryBuildPatterns: [`${app.dir.src}/**/*.js`, `${app.dir.src}/**/**.map`],
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: `${app.dir.src}/index.html`,
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: `${app.dir.src}/assets/`, to: app.dir.wwwRoot }],
        }),
    ],
};
