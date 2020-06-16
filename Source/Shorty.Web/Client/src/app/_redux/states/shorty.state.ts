export const SHORTY_STATE_KEY = 'shorty';

export interface IShortyState {
    uri: string;
    longUri: string;
    uriPrefix?: string;
}

export const initialShortyState: IShortyState = {
    uri: '',
    longUri: '',
    uriPrefix: '',
};
