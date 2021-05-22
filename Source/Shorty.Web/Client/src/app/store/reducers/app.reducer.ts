import { Action, ActionReducerMap, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/app.actions';
import { IAppState, ILoaderState, initialLoaderState } from '../states/app.state';

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
