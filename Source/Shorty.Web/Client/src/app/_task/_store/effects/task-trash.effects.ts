import { Injectable } from '@angular/core';
import type { Router } from '@angular/router';
import type { Actions } from '@ngrx/effects';
import { createEffect, ofType } from '@ngrx/effects';
import type { Store } from '@ngrx/store';
import { filter, map, switchMap } from 'rxjs/operators';
import type { ITask } from '../../task.models';
import { loadTaskTrash, loadTaskTrashSuccess } from '../actions/task-trash.actions';
import { getInactiveTaskListState } from '../selectors';
import type { ITaskState } from '../task.state';

@Injectable()
export class TaskTrashEffects {
    listTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTaskTrash),
            switchMap(() =>
                this.store.select(getInactiveTaskListState).pipe(
                    filter(() => this.router.url.indexOf('trash') > -1),
                    map((tasks: ITask[]) => loadTaskTrashSuccess(tasks))
                )
            )
        )
    );

    constructor(private actions$: Actions, private store: Store<ITaskState>, private router: Router) {}
}
