import { Action, createReducer, on } from '@ngrx/store';
import { ITask } from '../../task.models';
import { emptyTaskTrash, loadTaskTrashSuccess, restoreTask } from '../actions/task-trash.actions';
import { initialTaskTrashState, ITaskTrashState } from './../task.state';

export const taskTrashReducer = createReducer<ITaskTrashState>(
    initialTaskTrashState,
    on(loadTaskTrashSuccess, (state, { payload: { tasks } }) => ({ ...state, tasks })),
    on(emptyTaskTrash, (state) => ({
        ...state,
        tasks: [],
    })),
    on(restoreTask, (state, { payload: { id } }) => ({
        ...state,
        tasks: state.tasks.filter((task: ITask) => task.id !== id),
    }))
);

export function taskTrashState(
    state: ITaskTrashState = initialTaskTrashState,
    action: Action
): ITaskTrashState {
    return taskTrashReducer(state, action);
}
