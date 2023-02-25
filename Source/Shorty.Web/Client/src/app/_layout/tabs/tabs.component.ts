import { Component } from '@angular/core';
import type { INavigationLink } from '../../app.models';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.html',
})
export class TabsComponent {
    navLinks: INavigationLink[] = [];
    selectionsCount = 0;
}
