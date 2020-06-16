import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    // tslint:disable-next-line
    selector: 'body',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['app.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
