import { Component, inject } from '@angular/core';
import { FlightNotesService } from '../services/flight-notes.service';
import { Note } from '../models/responses';
import { NoteCard } from '../components/note-card.component';
import { ActivatedRoute } from '@angular/router';
import { NoteForm } from '../components/note-form.component';
import { NotePayload } from '../models/payloads';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { NoteFormDialog } from '../components/note-form-dialog.component';
import { NoteFormDialogOperation } from '../middleware/enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notes',
  template: `
    <section style="margin-bottom: 2rem; display: grid; place-items: center;">
      <mat-card appearance="outlined" style="width: 100%; max-width: 50rem;">
        <mat-card-content>
          <note-form (handleSubmit)="createNote($event)" />
        </mat-card-content>
      </mat-card>
    </section>

    <section style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
      @for (note of notes; track note.id) {
        <note-card [note]="note" (handleClick)="expandNote($event)" />
      }
    </section>
  `,
  standalone: true,
  imports: [
    NoteCard,
    NoteForm,
    MatCard,
    MatCardContent
  ]
})
export class NotesPage {
  notes: Note[] = [];

  readonly dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    private notesService: FlightNotesService,
    private snackBar: MatSnackBar,
  ) {
    this.route.params.subscribe(async param => {
      const flightId = parseInt(param['id'], 10);

      this.notesService.constructWithFlightId(flightId);
    });

    this.notesService.notesObservable.subscribe(notes => this.notes = notes);
  }

  createNote(payload: NotePayload) {
    this.notesService.addNote(payload);
  }

  expandNote(note: Note) {
    const dialogRef = this.dialog.open(NoteFormDialog, {
      data: {
        note,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch (result.operation) {
          case NoteFormDialogOperation.OnEdit:
            this.notesService.editNote(note.id, result.payload);
            break;
          case NoteFormDialogOperation.OnDelete:
            this.notesService.deleteNote(note.id, () => {
              this.snackBar.open(`Flight with id ${ note.id } successfully deleted`, 'Okay')
            });
            break;
        }
      }
    });
  }
}
