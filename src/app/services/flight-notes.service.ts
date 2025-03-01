import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models/responses';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { NotePayload } from '../models/payloads';
import { environment } from '../../environments/environment';

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

    this.httpClient.get<Note[]>(environment.baseUrl + `/api/flights/${ flightId }/notes`, { headers: this.headers })
      .subscribe(notes => this.notesSubject.next(notes));
  }

  addNote(payload: NotePayload) {

    if (this.currentFlightId == null) {
      throw new Error('currentFlightId must be defined to create new note');
    }

    this.httpClient.post<Note>(environment.baseUrl + `/api/notes`, { ...payload, flight_id: this.currentFlightId }, { headers: this.headers })
      .subscribe(note => {
        const notes = this.notesSubject.value;

        notes.push(note);

        this.notesSubject.next(notes);
      });
  }

  editNote(noteId: number, payload: NotePayload) {
    this.httpClient.put<Note>(environment.baseUrl + `/api/notes/${ noteId }`, payload, { headers: this.headers })
      .subscribe(note => {
        const notes = this.notesSubject.value;

        const index = notes.findIndex(n => n.id === note.id);
        if (index >= 0) notes.splice(index, 1, note);

        this.notesSubject.next(notes);
      })
  }

  deleteNote(noteId: number, onSuccess: () => void) {
    this.httpClient.delete(environment.baseUrl + `/api/notes/${ noteId }`, { headers: this.headers })
      .subscribe(() => {
        const notes = this.notesSubject.value;

        const index = notes.findIndex(n => n.id === noteId);
        if (index >= 0) notes.splice(index, 1);

        this.notesSubject.next(notes);

        onSuccess();
      })
  }
}
