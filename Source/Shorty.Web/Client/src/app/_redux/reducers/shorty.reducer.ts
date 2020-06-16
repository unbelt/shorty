import { Action, createReducer, on } from '@ngrx/store';
import * as action from '../actions/shorty.actions';
import { initialShortyState, IShortyState } from '../states/shorty.state';

const shortyReducer = createReducer<IShortyState>(
    initialShortyState,
    on(action.getShortUri, (state, { payload: { longUri, uriPrefix } }) => ({
        ...state,
        longUri,
        uriPrefix,
    })),
    on(action.reciveUri, (state, { payload: { uri } }) => ({
        ...state,
        uri,
    }))
);

export function shorty(state: IShortyState, action: Action): IShortyState {
    return shortyReducer(state, action);
}
