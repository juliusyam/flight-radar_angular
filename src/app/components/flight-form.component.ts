import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FlightFormGroup, FlightPayload } from '../models/payloads';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'flight-form',
  template: `
    <form [formGroup]="flightForm" (ngSubmit)="onSubmit()" style="display: grid; gap: 1rem;">
      <mat-form-field>
        <mat-label>Departure Date</mat-label>
        <input matInput [matDatepicker]="picker" formControlName="departure_date" name="departure_date">
        <mat-hint>MM/DD/YYYY</mat-hint>
        <mat-datepicker-toggle matIconSuffix [for]="picker">
          <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>
        </mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Flight Number</mat-label>
        <input type="text" placeholder="e.g. FR3805" formControlName="flight_number" name="flight_number" matInput />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Departure Airport (ICAO)</mat-label>
        <input type="text" placeholder="e.g. MAN" formControlName="departure_airport" name="departure_airport" matInput />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Arrival Airport (ICAO)</mat-label>
        <input type="text" placeholder="e.g. FUE" formControlName="arrival_airport" name="arrival_airport" matInput />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Distance (miles)</mat-label>
        <input type="number" min="0" formControlName="distance" name="distance" matInput />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Airline (ICAO)</mat-label>
        <input type="text" placeholder="e.g. RYR" formControlName="airline" name="airline" matInput />
      </mat-form-field>

      <button mat-flat-button type="submit" [disabled]="!flightForm.valid">Create Flight Entry</button>
    </form>
  `,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatDatepicker,
    MatHint,
    MatIconModule,
    MatButton,
  ],
  providers: [
    provideNativeDateAdapter(),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightForm {
  @Output() handleSubmit: EventEmitter<FlightPayload> = new EventEmitter<FlightPayload>();

  flightForm = new FormGroup<FlightFormGroup>({
    departure_date: new FormControl(new Date(), { nonNullable: true, validators: [Validators.required] }),
    flight_number: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    departure_airport: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    arrival_airport: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    distance: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    airline: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] })
  });

  onSubmit() {
    this.handleSubmit.emit(this.flightForm.value);
    this.flightForm.reset();
  }
}
