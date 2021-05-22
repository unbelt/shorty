import { ActionReducerMap } from '@ngrx/store';
import { ITaskState } from '../task.state';
import { taskListState } from './task-list.reducer';
import { taskTrashState } from './task-trash.reducer';

export const taskReducerMap: ActionReducerMap<ITaskState> = {
    list: taskListState,
    trash: taskTrashState,
};
