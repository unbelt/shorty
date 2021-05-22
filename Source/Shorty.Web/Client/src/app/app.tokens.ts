import { InjectionToken } from '@angular/core';

// Token for the state keys
export const ROOT_STATE_TOKEN = new InjectionToken<string[]>('RootState');

// Token for the sessionStorage keys
export const ROOT_SESSION_STORAGE_TOKEN = new InjectionToken<string[]>('RootStorage');
