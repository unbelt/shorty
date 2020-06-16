import { Component } from '@angular/core';
import { INavigationLink } from '../_models/base.models';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.html',
})
export class TabsComponent {
    navLinks: INavigationLink[] = [];

    selectionsCount = 0;

    constructor() {}
}
