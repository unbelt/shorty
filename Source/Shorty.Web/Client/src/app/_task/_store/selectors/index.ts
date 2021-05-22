import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITaskState, TASK_STORE_NAME } from '../task.state';
import { getActiveTasks, getInactiveTasks, getTaskListIsLoaded } from './task.selectors';

const getTaskModule = createFeatureSelector<ITaskState>(TASK_STORE_NAME);

const getTaskListSelector = createSelector(getTaskModule, (state) => state.list);

export const getActiveTaskListState = createSelector(getTaskListSelector, getActiveTasks);
export const getInactiveTaskListState = createSelector(getTaskListSelector, getInactiveTasks);
export const getTaskListIsLoadedState = createSelector(getTaskListSelector, getTaskListIsLoaded);
