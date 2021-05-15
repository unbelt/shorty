import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { META_REDUCERS, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { LayoutModule } from './_layout/layout.module';
import { SHORTY_STATE_KEY } from './_shorty/store/shorty.state';
import { ShortenEffects } from './_shorty/store/shorty.effects';

import { rootReducerMap } from './store/reducers/root.reducer';
import { getMetaReducers } from './store/reducers/storage-meta.reducer';
import { APP_STATE_KEY } from './store/states/app.state';
import { STORAGE_KEY } from './store/states/root.state';
import { SessionStorageService } from './services/session-storage.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ROOT_SESSION_STORAGE_KEY, ROOT_STORAGE_KEYS } from './app.tokens';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        LayoutModule,
        BrowserModule.withServerTransition({ appId: 'shorty' }),
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        StoreModule.forRoot(rootReducerMap, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
                strictStateSerializability: true,
                strictActionSerializability: true,
            },
        }),
        EffectsModule.forRoot([ShortenEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25 }), // maxAge: save max 25 states
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
        { provide: ROOT_STORAGE_KEYS, useValue: [APP_STATE_KEY, SHORTY_STATE_KEY] }, // Use to store values on store change
        { provide: ROOT_SESSION_STORAGE_KEY, useValue: STORAGE_KEY },
        {
            provide: META_REDUCERS,
            deps: [ROOT_STORAGE_KEYS, ROOT_SESSION_STORAGE_KEY, SessionStorageService],
            useFactory: getMetaReducers,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
