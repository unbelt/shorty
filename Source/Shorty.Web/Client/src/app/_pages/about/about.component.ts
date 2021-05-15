import { Component } from '@angular/core';
import { TextContent } from './../../app.content';

@Component({
    templateUrl: 'about.html',
    styleUrls: ['about.scss'],
})
export class AboutComponent {
    text = TextContent;
}
