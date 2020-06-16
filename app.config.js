var path = require('path');
var APP_WEB = './Source/Shorty.Web';
var config = require(APP_WEB + '/appsettings.json');

module.exports = {
    app: {
        version: config.Api.Version,
    },
    dir: {
        root: __dirname,
        wwwRoot: path.resolve(APP_WEB, 'wwwroot'),
        client: path.resolve(APP_WEB, 'Client'),
        src: path.resolve(APP_WEB, 'Client/src'),
    },
};
