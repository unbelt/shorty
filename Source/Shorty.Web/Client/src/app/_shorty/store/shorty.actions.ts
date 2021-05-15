import { createAction } from '@ngrx/store';
import { actionType } from '../../store/actions/action-type';

export enum ShortyAction {
    GET_SHORT_URI = '[Shorty] Get URI',
    RECIVE_URI = '[Shorty] Recive URI',
}

export const getShortUri = createAction(
    actionType(ShortyAction.GET_SHORT_URI),
    (longUri: string, uriPrefix?: string) => ({
        payload: { longUri, uriPrefix },
    })
);

export const reciveUri = createAction(actionType(ShortyAction.RECIVE_URI), (uri: string) => ({
    payload: { uri },
}));
