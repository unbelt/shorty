import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ShortyComponent } from './shorty.component';

const routes: Routes = [
    {
        path: '',
        component: ShortyComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ShortyRoutingModule {}
