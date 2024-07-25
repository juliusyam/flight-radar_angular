import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models/responses';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { NotePayload } from '../models/payloads';

@Injectable()
export class FlightNotesService {
  private currentFlightId: number | undefined = undefined;

  private notesSubject = new BehaviorSubject<Note[]>([]);
  notesObservable = this.notesSubject.asObservable();

  private readonly headers = new HttpHeaders();

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

  addNote(payload: NotePayload) {

    if (this.currentFlightId == null) {
      throw new Error('currentFlightId must be defined to create new note');
    }

    this.httpClient.post<Note>(`http://localhost:8000/api/notes`, { ...payload, flight_id: this.currentFlightId }, { headers: this.headers })
      .subscribe(note => {
        const notes = this.notesSubject.value;

        notes.push(note);

        this.notesSubject.next(notes);
      });
  }

  editNote(noteId: number, payload: NotePayload) {
    this.httpClient.put<Note>(`http://localhost:8000/api/notes/${ noteId }`, payload, { headers: this.headers })
      .subscribe(note => {
        const notes = this.notesSubject.value;

        const index = notes.findIndex(n => n.id === note.id);
        if (index >= 0) notes.splice(index, 1, note);

        this.notesSubject.next(notes);
      })
  }
}
