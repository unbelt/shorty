export const APP_STORE_NAME = 'app';

export interface ILoaderState {
    isLoading: boolean;
}

export const initialLoaderState: ILoaderState = {
    isLoading: false,
};

export interface IAppState {
    loader: ILoaderState;
}

export const initialAppState: IAppState = {
    loader: initialLoaderState,
};
