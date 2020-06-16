import { ActionReducerMap } from '@ngrx/store';
import { IRootState } from '../states/root.state';
import { app } from './app.reducer';
import { shorty } from './shorty.reducer';

// any: workaround for AoT build
export const rootReducerMap: ActionReducerMap<IRootState | any> = {
    app,
    shorty,
};
