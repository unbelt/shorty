import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { merge, pick } from 'lodash-es'; // TODO: Find alternative & remove lodash package
import { SessionStorageService } from '../../_services/session-storage.service';

// Factory meta-reducer configuration function
export function getMetaReducers(
    stateKeys: string[],
    sessionStorageKey: string,
    storageService: SessionStorageService
): MetaReducer<any> {
    return storageMetaReducer(stateKeys, sessionStorageKey, storageService);
}

function storageMetaReducer<S, A extends Action = Action>(
    stateKeys: string[],
    sessionStorageKey: string,
    storageService: SessionStorageService
) {
    // After init/refresh
    let onInit = true;

    return (reducer: ActionReducer<S, A>) => {
        return (state: S, action: A): S => {
            // Get to the nextState
            const nextState = reducer(state, action);

            // Init the application state
            if (onInit) {
                onInit = false;
                const savedState = storageService.getState(sessionStorageKey);

                return merge(nextState, savedState);
            }

            // Save the next state to the application storage
            if (stateKeys.length) {
                const stateToSave = pick(nextState, stateKeys);
                storageService.setState(stateToSave, sessionStorageKey);
            }

            return nextState;
        };
    };
}
