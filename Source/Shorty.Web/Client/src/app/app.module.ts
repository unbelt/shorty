import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { META_REDUCERS, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LayoutModule } from './_layout/layout.module';
import { ShortyModule } from './_shorty/shorty.module';
import { SHORTY_STORE_NAME } from './_shorty/store/shorty.state';
import { TASK_STORE_NAME } from './_task/_store/task.state';
import { TaskModule } from './_task/task.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ROOT_SESSION_STORAGE_TOKEN, ROOT_STATE_TOKEN } from './app.tokens';
import { SessionStorageService } from './services/session-storage.service';
import { appReducerMap } from './store/reducers/app.reducer';
import { getMetaReducers } from './store/reducers/storage-meta.reducer';
import { APP_STORE_NAME } from './store/states/app.state';
import { ROOT_SESSION_STORAGE_KEY } from './store/states/root.state';

@NgModule({
    declarations: [AppComponent],
    imports: [
        // Angular
        CommonModule,
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({ appId: 'shorty' }),

        // NGRX
        StoreModule.forFeature(APP_STORE_NAME, appReducerMap),
        StoreModule.forRoot(
            {},
            {
                runtimeChecks: {
                    strictStateImmutability: true,
                    strictActionImmutability: true,
                    strictStateSerializability: true,
                    strictActionSerializability: true,
                },
            }
        ),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({ maxAge: 25 }), // Save max 25 states

        // Internal
        AppRoutingModule,
        LayoutModule,
        ShortyModule,
        TaskModule,
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
        // Use to store values on store change
        { provide: ROOT_STATE_TOKEN, useValue: [APP_STORE_NAME, SHORTY_STORE_NAME, TASK_STORE_NAME] },
        { provide: ROOT_SESSION_STORAGE_TOKEN, useValue: ROOT_SESSION_STORAGE_KEY, multi: true },
        {
            provide: META_REDUCERS,
            deps: [ROOT_STATE_TOKEN, ROOT_SESSION_STORAGE_TOKEN, SessionStorageService],
            useFactory: getMetaReducers,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
