const webpack = require('webpack-merge');

module.exports = (env) => {
    const webpackCommon = require('./webpack.common.js');
    const webpackConfig = env.production ? require('./webpack.prod.js') : require('./webpack.dev.js');

    return webpack.merge(webpackCommon, webpackConfig);
};
