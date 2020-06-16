import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ShortyService } from '../../_services/shorty.service';
import * as action from '../actions/shorty.actions';

@Injectable()
export class ShortenEffects {
    shortUri$ = createEffect(() =>
        this.actions$.pipe(
            ofType(action.getShortUri),
            switchMap((state) => {
                return this.shortyService.getShortUri(state.payload.longUri, state.payload.uriPrefix).pipe(
                    map((shortenUri: string) => {
                        return action.reciveUri(shortenUri);
                    })
                );
            })
        )
    );

    constructor(private actions$: Actions, private shortyService: ShortyService) {}
}
