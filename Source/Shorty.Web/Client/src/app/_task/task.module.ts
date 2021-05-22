import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TaskListComponent } from './list/task-list.component';
import { TaskNavComponent } from './nav/task-nav.component';
import { TaskRoutingModule } from './task-routing.module';
import { TaskTrashComponent } from './trash/task-trash.components';
import { TaskListEffects } from './_store/effects/task-list.effects';
import { TaskTrashEffects } from './_store/effects/task-trash.effects';
import { taskReducerMap } from './_store/reducers';
import { TASK_STORE_NAME } from './_store/task.state';

@NgModule({
    declarations: [TaskListComponent, TaskTrashComponent, TaskNavComponent],
    imports: [
        // Angular
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatCardModule,
        MatListModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,

        // NGRX
        StoreModule.forFeature(TASK_STORE_NAME, taskReducerMap),
        EffectsModule.forFeature([TaskListEffects, TaskTrashEffects]),

        // Internal
        TaskRoutingModule,
    ],
})
export class TaskModule {}
