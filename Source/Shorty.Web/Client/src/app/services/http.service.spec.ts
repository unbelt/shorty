import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { IEntity } from '../app.models';
import { AppModel } from '../store/models/app.model';
import { HttpService } from './http.service';
import { TosaterService } from './toaster.service';

describe('Http service', () => {
    let service: HttpService;
    let appModelSpy: jasmine.SpyObj<AppModel>;
    let httpSpy: jasmine.SpyObj<HttpClient>;
    let toasterSpy: jasmine.SpyObj<TosaterService>;

    const entities: IEntity[] = [{ id: '1', name: 'name1' }];

    beforeEach(() => {
        appModelSpy = jasmine.createSpyObj('AppModel', ['loaderStart', 'loaderEnd']);
        httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
        toasterSpy = jasmine.createSpyObj('TosaterService', ['openToaster']);

        httpSpy.get.and.returnValue(of(entities));
        httpSpy.post.and.returnValue(of(entities));

        TestBed.configureTestingModule({
            imports: [MatSnackBarModule, HttpClientModule],
            providers: [
                HttpService,
                { provide: HttpClient, useValue: httpSpy },
                { provide: AppModel, useValue: appModelSpy },
                { provide: TosaterService, useValue: toasterSpy },
            ],
        });

        service = TestBed.inject(HttpService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('get method', () => {
        it('should show spinner', () => {
            service.get('url');

            expect(appModelSpy.loaderStart).toHaveBeenCalled();
        });

        it('should stop spinner and return data', () => {
            service.get('url').subscribe((data) => {
                expect(data).toBe(entities);
            });

            expect(appModelSpy.loaderEnd).toHaveBeenCalled();
        });

        it('should show toaster error message on get', () => {
            httpSpy.get.and.returnValue(
                throwError({
                    message: 'This is an error!',
                })
            );

            service.get('shorty').subscribe();

            expect(toasterSpy.openToaster).toHaveBeenCalledWith(
                'shorty failed: Something went wrong! Please check validity of the URI.'
            );
        });
    });

    describe('post method', () => {
        it('should show spinner', () => {
            service.post('url', {});

            expect(appModelSpy.loaderStart).toHaveBeenCalled();
        });

        it('should stop spinner and return data', () => {
            service.post('url', {}).subscribe((data) => {
                expect(data).toBe(entities);
            });

            expect(appModelSpy.loaderEnd).toHaveBeenCalled();
        });

        it('should show toaster error message on post', () => {
            httpSpy.post.and.returnValue(
                throwError({
                    message: 'This is an error!',
                })
            );

            service.post('shorty', {}).subscribe();

            expect(toasterSpy.openToaster).toHaveBeenCalledWith(
                'shorty failed: Something went wrong! Please check validity of the URI.'
            );
        });
    });
});
