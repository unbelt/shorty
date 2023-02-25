import { Injectable } from '@angular/core';
import type { Store } from '@ngrx/store';
import { emptyTaskTrash, loadTaskTrash, restoreTask } from '../actions/task-trash.actions';
import { getInactiveTaskListState } from '../selectors';
import type { ITaskState } from '../task.state';

@Injectable({ providedIn: 'root' })
export class TaskTrashModel {
    tasks$ = this.store.select(getInactiveTaskListState);

    constructor(private store: Store<ITaskState>) {}

    loadTaskTrash(): void {
        this.store.dispatch(loadTaskTrash());
    }

    restoreTask(id: number): void {
        this.store.dispatch(restoreTask(id));
    }

    emptyTaskTrash(): void {
        this.store.dispatch(emptyTaskTrash());
    }
}
