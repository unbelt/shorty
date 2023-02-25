import { createAction } from '@ngrx/store';
import { actionType } from '../../../store/actions/action-type';
import type { ITask } from '../../task.models';

export enum TaskListAction {
    LOAD_TASK_LIST = '[TASK List] Load',
    LOAD_TASK_LIST_SUCCESS = '[TASK List] Load success',
    LOAD_TASK_LIST_ERROR = '[TASK List] Load error',
    ADD_TASK = '[TASK] Add',
    TOGGLE_TASK_COMPLETE = '[TASK] Toggle complete',
    DELETE_TASK = '[TASK] Delete',
}

export const loadTaskList = createAction(actionType(TaskListAction.LOAD_TASK_LIST));

export const loadTaskListSuccess = createAction(
    actionType(TaskListAction.LOAD_TASK_LIST_SUCCESS),
    (tasks: ITask[]) => ({
        payload: { tasks },
    })
);

export const loadTaskListError = createAction(
    actionType(TaskListAction.LOAD_TASK_LIST_ERROR),
    (error: Error) => ({
        error,
    })
);

export const addTask = createAction(actionType(TaskListAction.ADD_TASK), (task: ITask) => ({
    payload: { task },
}));

export const toggleTaskComplete = createAction(
    actionType(TaskListAction.TOGGLE_TASK_COMPLETE),
    (id: number) => ({
        payload: { id },
    })
);

export const deleteTask = createAction(actionType(TaskListAction.DELETE_TASK), (id: number) => ({
    payload: { id },
}));
