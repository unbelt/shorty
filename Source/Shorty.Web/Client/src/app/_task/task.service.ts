import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/operators';
import type { ITask } from './task.models';

@Injectable({ providedIn: 'root' })
export class TaskService {
    // TODO: Get from the server
    private initialTasks: ITask[] = [
        {
            id: 1,
            title: 'Buy bread 🍞 and bacon 🥓',
            description: 'for a sandwich 🍔',
        },
        {
            id: 2,
            title: 'Walk the dog 🐕',
        },
        {
            id: 3,
            title: 'Take out the trash 🗑️',
            description: 'ASAP!',
        },
    ];

    getTasks(): Observable<ITask[]> {
        return of(this.initialTasks).pipe(delay(1000));
    }
}
