export const APP_STATE_KEY = 'app';

export interface ILoaderState {
    isLoading: boolean;
}

export const initialLoaderState: ILoaderState = {
    isLoading: false,
};

export interface IAppState {
    loaderState: ILoaderState;
}

export const initialAppState: IAppState = {
    loaderState: initialLoaderState,
};
