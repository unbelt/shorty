import type { Action } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import type { ITask } from '../../task.models';
import {
    addTask,
    deleteTask,
    loadTaskList,
    loadTaskListSuccess,
    toggleTaskComplete,
} from '../actions/task-list.actions';
import { emptyTaskTrash, restoreTask } from '../actions/task-trash.actions';
import type { ITaskListState } from '../task.state';
import { initialTaskListState } from '../task.state';

const taskListReducer = createReducer<ITaskListState>(
    initialTaskListState,
    on(loadTaskList, (state) => ({ ...state })),
    on(loadTaskListSuccess, (state, { payload: { tasks } }) => ({
        ...state,
        tasks: state.tasks.length ? state.tasks : tasks,
        isLoaded: true,
    })),
    on(addTask, (state, { payload: { task } }) => ({
        ...state,
        tasks: [task, ...state.tasks],
    })),
    on(toggleTaskComplete, (state, { payload: { id } }) => ({
        ...state,
        tasks: state.tasks.map((task: ITask) => {
            return task.id === id
                ? {
                      ...task,
                      isCompleted: !task.isCompleted,
                  }
                : task;
        }),
    })),
    on(deleteTask, (state, { payload: { id } }) => ({
        ...state,
        tasks: state.tasks.map((task: ITask) => {
            return task.id === id
                ? {
                      ...task,
                      isInTrash: true,
                  }
                : task;
        }),
    })),
    on(restoreTask, (state, { payload: { id } }) => ({
        ...state,
        tasks: state.tasks.map((task: ITask) => {
            return task.id === id
                ? {
                      ...task,
                      isInTrash: false,
                      isDeleted: false,
                  }
                : task;
        }),
    })),
    on(emptyTaskTrash, (state) => ({
        ...state,
        tasks: state.tasks.map((task: ITask) => {
            return {
                ...task,
                isDeleted: task.isInTrash,
            };
        }),
    }))
);

export function taskListState(state: ITaskListState = initialTaskListState, action: Action): ITaskListState {
    return taskListReducer(state, action);
}
