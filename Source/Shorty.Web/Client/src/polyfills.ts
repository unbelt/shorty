// Internet Explorer support (> 9)
import 'core-js/es6/array';
import 'core-js/es6/map';
import 'core-js/es6/object';
import 'core-js/es6/reflect';
import 'core-js/es6/string';
import 'core-js/es6/symbol';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

if (!Element.prototype.matches) {
    Element.prototype.matches =
        (Element.prototype as any).msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
