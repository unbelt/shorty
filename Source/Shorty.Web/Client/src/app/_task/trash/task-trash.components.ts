import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { TaskTrashModel } from '../_store/models/task-trash.model';

@Component({
    templateUrl: 'task-trash.html',
    styleUrls: ['task-trash.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskTrashComponent implements OnInit {
    tasks$ = this.taskTrashModel.tasks$;

    constructor(private taskTrashModel: TaskTrashModel) {}

    ngOnInit(): void {
        this.taskTrashModel.loadTaskTrash();
    }

    emptyTaskTrash(): void {
        this.taskTrashModel.emptyTaskTrash();
    }

    restoreTask(id: number): void {
        this.taskTrashModel.restoreTask(id);
    }
}
