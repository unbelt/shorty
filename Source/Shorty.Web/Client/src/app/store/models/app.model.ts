import { Injectable } from '@angular/core';
import type { Store } from '@ngrx/store';
import * as action from '../actions/app.actions';
import { appState } from '../selectors/app.selectors';
import type { IRootState } from '../states/root.state';

@Injectable({ providedIn: 'root' })
export class AppModel {
    appState$ = this.store.select(appState);

    constructor(private store: Store<IRootState>) {}

    loaderStart(): void {
        this.store.dispatch(action.loaderStart());
    }

    loaderEnd(): void {
        this.store.dispatch(action.loaderEnd());
    }
}
