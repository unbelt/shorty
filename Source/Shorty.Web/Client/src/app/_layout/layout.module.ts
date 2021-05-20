import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { LoaderComponent } from './loader/loader.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
    imports: [CommonModule, RouterModule, MatButtonModule, MatTabsModule, MatSnackBarModule],
    declarations: [LayoutComponent, HeaderComponent, FooterComponent, TabsComponent, LoaderComponent],
})
export class LayoutModule {}
