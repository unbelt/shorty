import { createAction } from '@ngrx/store';
import { actionType } from '../../../store/actions/action-type';
import type { ITask } from '../../task.models';

export enum TaskTrashAction {
    LOAD_TASK_TRASH = '[TASK Trash] Load',
    LOAD_TASK_TRASH_SUCCESS = '[TASK Trash] Load success',
    RESTORE_TASK = '[TASK Trash] Restore',
    EMPTY_TASK_TRASH = '[TASK Trash] Empty',
}

export const loadTaskTrash = createAction(actionType(TaskTrashAction.LOAD_TASK_TRASH));

export const loadTaskTrashSuccess = createAction(
    actionType(TaskTrashAction.LOAD_TASK_TRASH_SUCCESS),
    (tasks: ITask[]) => ({
        payload: { tasks },
    })
);

export const restoreTask = createAction(actionType(TaskTrashAction.RESTORE_TASK), (id: number) => ({
    payload: { id },
}));

export const emptyTaskTrash = createAction(actionType(TaskTrashAction.EMPTY_TASK_TRASH));
