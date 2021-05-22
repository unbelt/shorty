import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, switchMap } from 'rxjs/operators';
import { ITask } from '../../task.models';
import { loadTaskTrash, loadTaskTrashSuccess } from '../actions/task-trash.actions';
import { getInactiveTaskListState } from '../selectors';
import { ITaskState } from '../task.state';

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
