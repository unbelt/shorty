import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TosaterService } from './toaster.service';

describe('Toaster service', () => {
    let service: TosaterService;
    const snackBarMock: MatSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatSnackBarModule],
            providers: [TosaterService, { provide: MatSnackBar, useValue: snackBarMock }],
        });

        TestBed.inject(MatSnackBar);

        service = TestBed.inject(TosaterService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should call snakBar open', () => {
        service.openToaster('display message');

        expect(snackBarMock.open).toHaveBeenCalledWith('display message', undefined, {
            duration: 5000,
            verticalPosition: 'top',
        });
    });
});
