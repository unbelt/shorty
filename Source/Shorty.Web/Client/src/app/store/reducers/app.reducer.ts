import type { Action, ActionReducerMap } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/app.actions';
import type { IAppState, ILoaderState } from '../states/app.state';
import { initialLoaderState } from '../states/app.state';

const reducer = createReducer<ILoaderState>(
    initialLoaderState,
    on(actions.loaderStart, (state) => ({
        ...state,
        loaderState: {
            ...state,
            isLoading: true,
        },
    })),
    on(actions.loaderEnd, (state) => ({
        ...state,
        loaderState: {
            ...state,
            isLoading: false,
        },
    }))
);

export function loaderReducer(state: ILoaderState = initialLoaderState, action: Action): ILoaderState {
    return reducer(state, action);
}

export const appReducerMap: ActionReducerMap<IAppState> = {
    loader: loaderReducer,
};
