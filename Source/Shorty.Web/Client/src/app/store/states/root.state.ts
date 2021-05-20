import { IShortyState, initialShortyState } from '../../_shorty/store/shorty.state';
import { IAppState, initialAppState } from './app.state';

export const STORAGE_KEY = 'bcs_storage';

export interface IRootState {
    readonly app: IAppState;
    readonly shorty: IShortyState;
}

export const initialRootState: IRootState = {
    app: initialAppState,
    shorty: initialShortyState,
};
