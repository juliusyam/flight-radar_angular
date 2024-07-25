import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models/responses';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class FlightNotesService {
  private currentFlightId: number | undefined = undefined;

  private notesSubject = new BehaviorSubject<Note[]>([]);
  notesObservable = this.notesSubject.asObservable();

  private headers = new HttpHeaders();

  constructor(private httpClient: HttpClient, authService: AuthService) {
    const token = authService.getUser()?.token;
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${ token }`
    });
  }

  constructWithFlightId(flightId: number) {

    if (this.currentFlightId == flightId) return;

    this.currentFlightId = flightId;

    this.notesSubject.next([]);

    console.log('Flight ID is:', flightId, this.currentFlightId);

    this.httpClient.get<Note[]>(`http://localhost:8000/api/flights/${ flightId }/notes`, { headers: this.headers })
      .subscribe(notes => this.notesSubject.next(notes));
  }
}
