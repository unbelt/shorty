import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'uri',
                pathMatch: 'full',
            },
            {
                path: 'uri',
                loadChildren: () => import('./_shorty/shorty.module').then((m) => m.ShortyModule),
            },
            // {
            //     path: 'todo',
            //     loadChildren: () => import('./_todo/todo.module').then((m) => m.TodoModule),
            // },
            {
                path: '-',
                loadChildren: () => import('./_pages/pages.module').then((m) => m.PagesModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
