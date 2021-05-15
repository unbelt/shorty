import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
    imports: [CommonModule, RouterModule, MatButtonModule, MatTabsModule, MatSnackBarModule],
    declarations: [LayoutComponent, HeaderComponent, FooterComponent, TabsComponent, LoaderComponent],
})
export class LayoutModule {}
