import { ITask } from '../../task.models';
import { ITaskListState } from '../task.state';

export const getActiveTasks = (state: ITaskListState) =>
    state.tasks.filter((task: ITask) => !task.isInTrash && !task.isDeleted);

export const getInactiveTasks = (state: ITaskListState) =>
    state.tasks.filter((task: ITask) => task.isInTrash && !task.isDeleted);

export const getTaskListIsLoaded = (state: ITaskListState) => state.isLoaded;
