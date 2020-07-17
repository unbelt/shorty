const webpack = require('webpack-merge');

module.exports = (env) => {
    const webpackCommon = require('./webpack.common.js');
    const webpackConfig = require(`./webpack.${env}.js`);

    return webpack.merge(webpackCommon, webpackConfig);
};
