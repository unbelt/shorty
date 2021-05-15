import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TextContent } from '../app.content';
import { TosaterService } from '../services/toaster.service';
import { ShortyModel } from './store/shorty.model';

@Component({
    templateUrl: 'shorty.html',
    styleUrls: ['shorty.scss'],
})
export class ShortyComponent {
    text = TextContent;

    uriForm = new FormControl(undefined, [Validators.required, Validators.minLength(5)]);
    uriPrefixForm = new FormControl(undefined, [Validators.maxLength(20)]);
    resultControl = new FormControl();

    constructor(public shortyModel: ShortyModel, private toasterService: TosaterService) {
        this.shortyModel.shortenUri$.subscribe((value: string) => {
            if (value) {
                this.resultControl.setValue(value);
            }
        });
    }

    shorten(): void {
        if (this.uriForm.disabled || this.uriForm.invalid) {
            return;
        }

        this.shortyModel.sendUri(this.uriForm.value, this.uriPrefixForm.value);
    }

    copyToClipboard(value: string): void {
        if (!document.queryCommandSupported || !document.queryCommandSupported('copy')) {
            return;
        }

        const textarea = document.createElement('textarea');
        textarea.textContent = value;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);

        textarea.select();

        try {
            document.execCommand('copy');
            this.toasterService.openToaster(this.text.CopiedToClipboard);
        } catch {
            this.toasterService.openToaster(this.text.CopyToClipboardFailed);
        } finally {
            document.body.removeChild(textarea);
        }
    }
}
