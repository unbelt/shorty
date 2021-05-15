import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
    setState(state: any, sessionStorageKey: string) {
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(state));
    }

    getState(sessionStorageKey: string): any {
        const storageData = sessionStorage.getItem(sessionStorageKey);

        if (storageData) {
            return JSON.parse(storageData);
        }
    }
}
