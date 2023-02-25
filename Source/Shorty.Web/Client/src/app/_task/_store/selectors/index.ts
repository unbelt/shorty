import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getActiveTasks, getInactiveTasks, getTaskListIsLoaded } from './task.selectors';
import type { ITaskState } from '../task.state';
import { TASK_STORE_NAME } from '../task.state';

const getTaskModule = createFeatureSelector<ITaskState>(TASK_STORE_NAME);

const getTaskListSelector = createSelector(getTaskModule, (state) => state.list);

export const getActiveTaskListState = createSelector(getTaskListSelector, getActiveTasks);
export const getInactiveTaskListState = createSelector(getTaskListSelector, getInactiveTasks);
export const getTaskListIsLoadedState = createSelector(getTaskListSelector, getTaskListIsLoaded);
