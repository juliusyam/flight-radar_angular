import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Note } from '../models/responses';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteFormGroup, NotePayload } from '../models/payloads';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'note-form',
  template: `
    <form [formGroup]="noteForm" (ngSubmit)="onSubmit()" style="display: grid; gap: 1rem;">
      <mat-form-field appearance="fill">
        <mat-label>Title</mat-label>
        <input type="text" formControlName="title" name="title" matInput />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Body</mat-label>
        <input type="text" formControlName="body" name="body" matInput />
      </mat-form-field>

      <button mat-flat-button type="submit" [disabled]="!noteForm.valid">Submit</button>
    </form>
  `,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton
  ]
})
export class NoteForm {
  @Input() note: Note | undefined = undefined;
  @Output() handleSubmit: EventEmitter<NotePayload> = new EventEmitter<NotePayload>();

  noteForm = new FormGroup<NoteFormGroup>({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    body: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
  });

  ngOnChanges(changes: SimpleChanges) {
    const noteCurrentValue = changes['note'].currentValue as Note | undefined;

    if (noteCurrentValue) {
      this.noteForm.setValue({
        title: noteCurrentValue.title,
        body: noteCurrentValue.body,
      });
    }
  }

  onSubmit() {
    this.handleSubmit.emit(this.noteForm.value);
    this.noteForm.reset();
  }
}
