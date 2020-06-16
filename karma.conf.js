const app = require('./app.config');

module.exports = function (config) {
    const webpackConfig = require(`${app.dir.root}/webpack.test.js`);

    const configuration = {
        basePath: app.dir.root,
        frameworks: ['jasmine'],
        files: [{ pattern: `${app.dir.root}/spec.bundle.js`, watched: false }],
        preprocessors: {
            './spec.bundle.js': ['webpack', 'sourcemap'],
        },
        client: {
            clearContext: false,
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true,
            stats: 'errors-only',
        },
        reporters: ['spec', 'kjhtml', 'coverage-istanbul'],
        browsers: ['Chrome'],
        browserNoActivityTimeout: 50000,
        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: false,
        logLevel: config.LOG_INFO,
        plugins: [
            'karma-webpack',
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-spec-reporter',
            'karma-jasmine-html-reporter',
            'karma-coverage-istanbul-reporter',
            '@angular-devkit/build-angular/plugins/karma',
        ],
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly', 'text-summary'],
            dir: `${app.dir.root}/coverage/`,
            combineBrowserReports: true,
            fixWebpackSourcePaths: true,
            skipFilesWithNoCoverage: true,
            thresholds: {
                global: {
                    statements: 70,
                    branches: 50,
                    functions: 60,
                    lines: 70,
                },
            },
        },
    };

    config.set(configuration);
};
