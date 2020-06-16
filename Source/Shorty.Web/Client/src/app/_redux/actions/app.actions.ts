import { createAction } from '@ngrx/store';
import { actionType } from './action-type';

export enum AppAction {
    INIT_CALLBACK_URI = '[App] Init callback URI',
    LOADER_START = '[App] Loader start',
    LOADER_END = '[App] Loader end',
}

export const initCallbackUri = createAction(
    actionType(AppAction.INIT_CALLBACK_URI),
    (callbackUrl: string) => ({
        payload: { callbackUrl },
    })
);

export const loaderStart = createAction(actionType(AppAction.LOADER_START));

export const loaderEnd = createAction(actionType(AppAction.LOADER_END));
