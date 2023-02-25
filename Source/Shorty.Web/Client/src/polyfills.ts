// Internet Explorer support (> 9)
import 'core-js/es/array';
import 'core-js/es/map';
import 'core-js/es/object';
import 'core-js/es/reflect';
import 'core-js/es/string';
import 'core-js/es/symbol';
import 'zone.js/dist/zone';

import * as process from 'process';

window['process'] = process;

if (!Element.prototype.matches) {
    Element.prototype.matches =
        (Element.prototype as any).msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
