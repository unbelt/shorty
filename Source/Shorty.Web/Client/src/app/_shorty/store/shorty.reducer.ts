import { Action, ActionReducerMap, createReducer, on } from '@ngrx/store';
import * as action from './shorty.actions';
import { initialUriState, IShortyState, IUriState } from './shorty.state';

const uriReducer = createReducer<IUriState>(
    initialUriState,
    on(action.getShortUri, (state, { payload: { longUri, uriPrefix } }) => ({
        ...state,
        longValue: longUri,
        prefix: uriPrefix,
    })),
    on(action.reciveUri, (state, { payload: { uri } }) => ({
        ...state,
        shortValue: uri,
    }))
);

export function uriState(state: IUriState = initialUriState, action: Action): IUriState {
    return uriReducer(state, action);
}

export const shortyReducerMap: ActionReducerMap<IShortyState> = {
    uri: uriState,
};
