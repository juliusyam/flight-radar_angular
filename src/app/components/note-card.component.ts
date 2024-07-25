import { Component, Input } from '@angular/core';
import { Note } from '../models/responses';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'note-card',
  template: `
    @if (note) {
      <mat-card appearance="outlined">
        <mat-card-header>
          {{ note.id }}
        </mat-card-header>
        <br>
        <mat-card-content>
          <mat-card-title>
            {{ note.title }}
          </mat-card-title>
          <mat-card-subtitle>
            {{ note.body }}
          </mat-card-subtitle>
        </mat-card-content>
      </mat-card>
    }
  `,
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle
  ]
})
export class NoteCard {
  @Input() note: Note | undefined = undefined;
}
