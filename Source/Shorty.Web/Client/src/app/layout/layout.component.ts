import { Component } from '@angular/core';
import { AppModel } from '../_redux/models/app.model';

@Component({
    selector: 'app-layout',
    templateUrl: 'layout.html',
})
export class LayoutComponent {
    constructor(public appModel: AppModel) {}
}
