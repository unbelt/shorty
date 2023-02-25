import { Injectable } from '@angular/core';
import type { Actions } from '@ngrx/effects';
import { createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import type { ITask } from '../../task.models';
import type { TaskService } from '../../task.service';
import { loadTaskList, loadTaskListError, loadTaskListSuccess } from '../actions/task-list.actions';

@Injectable()
export class TaskListEffects {
    listTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTaskList),
            switchMap(() =>
                this.taskService.getTasks().pipe(
                    map((tasks: ITask[]) => loadTaskListSuccess(tasks)),
                    catchError((error: Error) => [loadTaskListError(error)])
                )
            )
        )
    );

    constructor(private actions$: Actions, private taskService: TaskService) {}
}
