import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
    declarations: [AboutComponent, NotFoundComponent],
    imports: [PagesRoutingModule, MatButtonModule, MatCardModule, MatIconModule, MatTooltipModule],
})
export class PagesModule {}
