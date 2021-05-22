import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './list/task-list.component';
import { TaskTrashComponent } from './trash/task-trash.components';

const routes: Routes = [
    {
        path: '',
        component: TaskListComponent,
    },
    {
        path: 'trash',
        component: TaskTrashComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TaskRoutingModule {}
