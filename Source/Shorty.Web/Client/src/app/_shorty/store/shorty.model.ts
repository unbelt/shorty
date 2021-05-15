import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as action from './shorty.actions';
import * as selectors from './shorty.selectors';
import { IRootState } from '../../store/states/root.state';

@Injectable({ providedIn: 'root' })
export class ShortyModel {
    shortyState$ = this.store.select(selectors.shortyState);
    longUri$ = this.store.select(selectors.longUri);
    shortenUri$ = this.store.select(selectors.shortenUri);
    uriPrefix$ = this.store.select(selectors.uriPrefix);

    constructor(private store: Store<IRootState>) {}

    sendUri(uri: string, uriPrefix?: string): void {
        this.store.dispatch(action.getShortUri(uri, uriPrefix));
    }

    reciveUri(uri: string): void {
        this.store.dispatch(action.reciveUri(uri));
    }
}
