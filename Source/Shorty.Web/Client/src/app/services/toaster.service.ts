import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class TosaterService {
    private readonly DEFAULT_MESSAGE_DURATION = 5000;

    constructor(private snackBar: MatSnackBar) {}

    openToaster(message: string, duration: number = this.DEFAULT_MESSAGE_DURATION): void {
        this.snackBar.open(message, undefined, {
            duration,
            verticalPosition: 'top',
        });
    }
}
