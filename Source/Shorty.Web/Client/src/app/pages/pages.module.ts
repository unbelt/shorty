import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
    declarations: [NotFoundComponent],
    imports: [PagesRoutingModule, MatButtonModule, MatIconModule, MatTooltipModule],
})
export class PagesModule {}
