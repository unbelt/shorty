import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { META_REDUCERS, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ROOT_SESSION_STORAGE_KEY, ROOT_STORAGE_KEYS } from './app.tokens';
import { LayoutComponent } from './layout/layout.component';
import { LoaderComponent } from './loader/loader.component';
import { TabsComponent } from './tabs/tabs.component';
import { ShortenEffects } from './_redux/effects/shorty.effects';
import { rootReducerMap } from './_redux/reducers/root.reducer';
import { getMetaReducers } from './_redux/reducers/storage-meta.reducer';
import { APP_STATE_KEY } from './_redux/states/app.state';
import { STORAGE_KEY } from './_redux/states/root.state';
import { SHORTY_STATE_KEY } from './_redux/states/shorty.state';
import { SessionStorageService } from './_services/session-storage.service';

@NgModule({
    declarations: [AppComponent, LayoutComponent, LoaderComponent, TabsComponent],
    imports: [
        CommonModule,
        BrowserModule.withServerTransition({ appId: 'shorty' }),
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        MatSnackBarModule,
        MatTabsModule,
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
