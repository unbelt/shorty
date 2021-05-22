import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskListModel } from '../_store/models/task-list.model';
import { ITask } from '../task.models';

@Component({
    templateUrl: 'task-list.html',
    styleUrls: ['task-list.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
    tasks$ = this.taskListModel.tasks$;
    isLoaded$ = this.taskListModel.isLoaded$;

    taskFormGroup!: FormGroup;

    constructor(private taskListModel: TaskListModel) {}

    ngOnInit(): void {
        this.taskListModel.loadTaskList();
        this.createFromGroup();
    }

    addTask(): void {
        const task: ITask = {
            id: Math.floor(Math.random() * 10000 + 10),
            title: this.taskFormGroup.value.title,
            description: this.taskFormGroup.value.description,
        };

        this.taskListModel.addTask(task);
        this.taskFormGroup.reset();
    }

    toggleTaskComplete(id: number): void {
        this.taskListModel.toggleTaskComplete(id);
    }

    deleteTask(id: number): void {
        this.taskListModel.deleteTask(id);
    }

    private createFromGroup(): void {
        this.taskFormGroup = new FormGroup({
            title: new FormControl(undefined, [Validators.required, Validators.minLength(2)]),
            description: new FormControl(),
        });
    }
}
