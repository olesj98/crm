import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position, Message } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class PositionsService {
    constructor(
        private http: HttpClient
    ) { }

    fetch(categoryid: string): Observable<Position[]> {
        return this.http.get<Position[]>(`/api/position/${categoryid}`);
    }

    create(position: Position): Observable<Position> {
        return this.http.post<Position>('/api/position', position);
    }

    update(position: Position): Observable<Position> {
        return this.http.patch<Position>(`/api/position/${position._id}`, position);
    }

    delete(positionId: string): Observable<Message> {
        return this.http.delete<Message>(`/api/position/${positionId}`);
    }
}
