import type { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import type { TosaterService } from './toaster.service';
// @ts-ignore
import { app } from '../../../../../../app.config.js';
import type { IDictionary } from '../app.models';
import type { AppModel } from '../store/models/app.model';

@Injectable({ providedIn: 'root' })
export class HttpService {
    constructor(
        private httpClinet: HttpClient,
        private appModel: AppModel,
        private toasterService: TosaterService
    ) {}

    get<T>(url: string, options?: any): Observable<T> {
        this.appModel.loaderStart();

        return this.httpClinet
            .get<T>(this.getUrl(url), this.getOptions(options))
            .pipe(catchError(this.handleError<any>(url)), finalize(this.finalize));
    }

    post<T>(url: string, body: any): Observable<T> {
        this.appModel.loaderStart();

        return this.httpClinet
            .post<T>(this.getUrl(url), body)
            .pipe(catchError(this.handleError<any>(url)), finalize(this.finalize));
    }

    private getUrl(url: string): string {
        return `${app.version}/api/${url}`;
    }

    private getOptions(params?: any): IDictionary<string> {
        let options = {};

        if (params) {
            options = { params: { ...options, ...params } };
        }

        return options;
    }

    private finalize = (): void => {
        this.appModel.loaderEnd();
    };

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (): Observable<T> => {
            this.toasterService.openToaster(
                `${operation} failed: Something went wrong! Please check validity of the URI.`
            );

            return of(result as T);
        };
    }
}
