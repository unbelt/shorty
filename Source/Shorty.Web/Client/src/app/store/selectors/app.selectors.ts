import { createSelector } from '@ngrx/store';
import type { IRootState } from '../states/root.state';

export const rootState = (state: IRootState) => state;

export const appState = createSelector(rootState, (state) => state.app);
export const isLoading = createSelector(appState, (state) => state.loader.isLoading);
