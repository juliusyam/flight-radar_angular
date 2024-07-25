import { Component } from '@angular/core';
import { FlightNotesService } from '../services/flight-notes.service';
import { Note } from '../models/responses';
import { NoteCard } from '../components/note-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notes',
  template: `
    <section style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
      @for (note of notes; track note.id) {
        <note-card [note]="note" />
      }
    </section>
  `,
  standalone: true,
  imports: [
    NoteCard
  ]
})
export class NotesPage {
  notes: Note[] = [];

  constructor(private route: ActivatedRoute, private notesService: FlightNotesService) {
    this.route.params.subscribe(async param => {
      const flightId = parseInt(param['id'], 10);

      this.notesService.constructWithFlightId(flightId);
    });

    this.notesService.notesObservable.subscribe(notes => this.notes = notes);
  }
}
