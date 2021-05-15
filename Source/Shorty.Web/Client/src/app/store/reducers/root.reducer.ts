import { ActionReducerMap } from '@ngrx/store';
import { shorty } from '../../_shorty/store/shorty.reducer';
import { IRootState } from '../states/root.state';
import { app } from './app.reducer';

// any: workaround for AoT build
export const rootReducerMap: ActionReducerMap<IRootState | any> = {
    app,
    shorty,
};
