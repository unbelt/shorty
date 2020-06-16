import { createSelector } from '@ngrx/store';
import { rootState } from './app.selectors';

export const shortyState = createSelector(rootState, (state) => state.shorty);
export const longUri = createSelector(shortyState, (state) => state.longUri);
export const shortenUri = createSelector(shortyState, (state) => state.uri);
export const uriPrefix = createSelector(shortyState, (state) => state.uriPrefix);
