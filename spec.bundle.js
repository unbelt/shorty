﻿Error.stackTraceLimit = Infinity;

require('core-js');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

const testing = require('@angular/core/testing');
const browser = require('@angular/platform-browser-dynamic/testing');

import * as process from 'process';

window['process'] = process;

testing.TestBed.initTestEnvironment(
    browser.BrowserDynamicTestingModule,
    browser.platformBrowserDynamicTesting()
);

const testContext = require.context('./Source/Shorty.Web/Client/src/app', true, /\.spec\.ts/);

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

requireAll(testContext);
