import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { HttpService } from '../services/http.service';

@Injectable({ providedIn: 'root' })
export class ShortyService {
    constructor(private http: HttpService) {}

    getShortUri(uri: string, uriPrefix?: string): Observable<string> {
        return this.http.get<string>('shorten', { uri, uriPrefix: uriPrefix || '' });
    }
}
