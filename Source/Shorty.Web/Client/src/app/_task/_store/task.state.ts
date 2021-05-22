import { ITask } from '../task.models';

export const TASK_STORE_NAME = 'task';

export interface ITaskListState {
    tasks: ITask[];
    isLoaded?: boolean;
}

export const initialTaskListState: ITaskListState = {
    tasks: [],
    isLoaded: false,
};

export interface ITaskTrashState extends ITaskListState {}

export const initialTaskTrashState: ITaskTrashState = {
    tasks: [],
    isLoaded: false,
};

export interface ITaskState {
    readonly list: ITaskListState;
    readonly trash: ITaskTrashState;
}

export const initialTaskState: ITaskState = {
    list: initialTaskListState,
    trash: initialTaskTrashState,
};
