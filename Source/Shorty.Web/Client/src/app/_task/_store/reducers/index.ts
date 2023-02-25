import type { ActionReducerMap } from '@ngrx/store';
import { taskListState } from './task-list.reducer';
import { taskTrashState } from './task-trash.reducer';
import type { ITaskState } from '../task.state';

export const taskReducerMap: ActionReducerMap<ITaskState> = {
    list: taskListState,
    trash: taskTrashState,
};
