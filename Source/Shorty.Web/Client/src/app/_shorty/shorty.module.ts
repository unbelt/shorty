import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ShortyRoutingModule } from './shorty-routing.module';
import { ShortyComponent } from './shorty.component';
import { ShortyEffects } from './store/shorty.effects';
import { shortyReducerMap } from './store/shorty.reducer';
import { SHORTY_STORE_NAME } from './store/shorty.state';

@NgModule({
    declarations: [ShortyComponent],
    imports: [
        // Angular
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule,

        // NGRX
        StoreModule.forFeature(SHORTY_STORE_NAME, shortyReducerMap),
        EffectsModule.forFeature([ShortyEffects]),

        // Internal
        ShortyRoutingModule,
    ],
})
export class ShortyModule {}
