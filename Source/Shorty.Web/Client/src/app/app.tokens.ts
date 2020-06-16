import { InjectionToken } from '@angular/core';

// Token for the state keys
export const ROOT_STORAGE_KEYS = new InjectionToken<string[]>('StoreKeys');

// Token for the sessionStorage key
export const ROOT_SESSION_STORAGE_KEY = new InjectionToken<string[]>('AppStorage');
