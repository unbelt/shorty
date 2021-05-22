import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITask } from '../../task.models';
import { addTask, deleteTask, loadTaskList, toggleTaskComplete } from '../actions/task-list.actions';
import { getActiveTaskListState, getTaskListIsLoadedState } from '../selectors';
import { ITaskState } from '../task.state';

@Injectable({ providedIn: 'root' })
export class TaskListModel {
    tasks$ = this.store.select(getActiveTaskListState);
    isLoaded$ = this.store.select(getTaskListIsLoadedState);

    constructor(private store: Store<ITaskState>) {}

    loadTaskList(): void {
        this.store.dispatch(loadTaskList());
    }

    addTask(task: ITask): void {
        this.store.dispatch(addTask(task));
    }

    toggleTaskComplete(id: number): void {
        this.store.dispatch(toggleTaskComplete(id));
    }

    deleteTask(id: number): void {
        this.store.dispatch(deleteTask(id));
    }
}
