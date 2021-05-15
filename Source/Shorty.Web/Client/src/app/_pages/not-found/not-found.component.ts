import { Component } from '@angular/core';
import { TextContent } from '../../app.content';

@Component({
    templateUrl: 'not-found.html',
    styleUrls: ['not-found.scss'],
})
export class NotFoundComponent {
    text = TextContent;
}
