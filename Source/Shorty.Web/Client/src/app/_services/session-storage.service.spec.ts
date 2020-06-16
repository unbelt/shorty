import { TestBed } from '@angular/core/testing';
import { SessionStorageService } from './session-storage.service';

let service: SessionStorageService;

describe('SessionStorage service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});

        service = TestBed.get(SessionStorageService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should get app state from session storage', () => {
        spyOn(window.sessionStorage, 'getItem');
        service.getState('app');

        expect(sessionStorage.getItem).toHaveBeenCalledWith('app');
    });

    it('should set app state in session storage', () => {
        spyOn(window.sessionStorage, 'setItem');
        const state = {};

        service.setState(state, 'app');

        expect(sessionStorage.setItem).toHaveBeenCalledWith('app', JSON.stringify(state));
    });
});
