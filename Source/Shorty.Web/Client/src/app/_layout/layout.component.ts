import { Component } from '@angular/core';
import { AppModel } from '../store/models/app.model';

@Component({
    selector: 'app-layout',
    templateUrl: 'layout.html',
})
export class LayoutComponent {
    constructor(public appModel: AppModel) {}
}
