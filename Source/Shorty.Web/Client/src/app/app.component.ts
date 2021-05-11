import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'body', // eslint-disable-line @angular-eslint/component-selector
    template: '<router-outlet></router-outlet>',
    styleUrls: ['app.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
