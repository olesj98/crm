import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OverviewPage, AnaliticsPage } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class AnaliticsService {
    constructor(
        private http: HttpClient
    ) {}

    getOverview(): Observable<OverviewPage> {
        return this.http.get<OverviewPage>('/api/analitics/overview');
    }

    getAnalitics(): Observable<AnaliticsPage> {
        return this.http.get<AnaliticsPage>('/api/analitics/analitics');
    }
}
