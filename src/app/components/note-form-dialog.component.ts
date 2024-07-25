import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { Note } from '../models/responses';
import { NoteForm } from './note-form.component';
import { NotePayload } from '../models/payloads';
import { NoteFormDialogOperation } from '../middleware/enum';

@Component({
  selector: 'note-form-dialog',
  template: `
    <div style="width: 30rem;">
      <mat-dialog-content style="padding: 2rem;">
        <note-form [note]="data.note" (handleSubmit)="onEdit($event)" />
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-stroked-button (click)="onDelete()">Delete</button>
        <button mat-flat-button (click)="onClose()">Close</button>
      </mat-dialog-actions>
    </div>
  `,
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    NoteForm
  ],
})
export class NoteFormDialog {
  readonly dialogRef = inject(MatDialogRef<NoteFormDialog>);
  readonly data = inject<{ note: Note }>(MAT_DIALOG_DATA);

  onClose() {
    this.dialogRef.close();
  }

  onEdit(payload: NotePayload) {
    this.dialogRef.close({
      operation: NoteFormDialogOperation.OnEdit,
      payload,
    });
  }

  onDelete() {
    this.dialogRef.close({
      operation: NoteFormDialogOperation.OnDelete,
    });
  }
}
