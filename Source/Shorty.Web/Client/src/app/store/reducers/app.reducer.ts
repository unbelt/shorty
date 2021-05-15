import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/app.actions';
import { IAppState, initialAppState } from '../states/app.state';

const appReducer = createReducer<IAppState>(
    initialAppState,
    on(actions.loaderStart, (state) => ({
        ...state,
        loaderState: {
            ...state.loaderState,
            isLoading: true,
        },
    })),
    on(actions.loaderEnd, (state) => ({
        ...state,
        loaderState: {
            ...state.loaderState,
            isLoading: false,
        },
    }))
);

export function app(state: IAppState, action: Action): IAppState {
    return appReducer(state, action);
}
