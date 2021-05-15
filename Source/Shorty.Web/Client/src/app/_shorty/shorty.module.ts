import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ShortyRoutingModule } from './shorty-routing.module';
import { ShortyComponent } from './shorty.component';

@NgModule({
    declarations: [ShortyComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ShortyRoutingModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule,
    ],
})
export class ShortyModule {}
