import { createSelector } from '@ngrx/store';
import { rootState } from '../../store/selectors/app.selectors';

export const uriState = createSelector(rootState, (state) => state.shorty.uri);
export const longUri = createSelector(uriState, (uri) => uri.longValue);
export const shortenUri = createSelector(uriState, (uri) => uri.shortValue);
export const uriPrefix = createSelector(uriState, (uri) => uri.prefix);
