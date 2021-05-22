import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ShortyService } from '../shorty.service';
import { getShortUri, reciveUri } from './shorty.actions';

@Injectable()
export class ShortyEffects {
    shortUri$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getShortUri),
            switchMap((state) => {
                return this.shortyService.getShortUri(state.payload.longUri, state.payload.uriPrefix).pipe(
                    map((shortenUri: string) => {
                        return reciveUri(shortenUri);
                    })
                );
            })
        )
    );

    constructor(private actions$: Actions, private shortyService: ShortyService) {}
}
