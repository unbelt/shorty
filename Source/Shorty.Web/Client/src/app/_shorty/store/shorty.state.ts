export const SHORTY_STORE_NAME = 'shorty';

export interface IShortyState {
    uri: IUriState;
}

export const initialShortyState: IShortyState = {
    uri: {
        longValue: '',
        shortValue: '',
        prefix: '',
    },
};

export interface IUriState {
    shortValue: string;
    longValue: string;
    prefix?: string;
}

export const initialUriState: IUriState = {
    shortValue: '',
    longValue: '',
    prefix: '',
};
