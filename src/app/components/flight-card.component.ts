import { Component, Input } from '@angular/core';
import { Flight } from '../models/responses';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'flight-card',
  template: `
    @if (flight) {
      <mat-card appearance="outlined">
        <mat-card-header style="font-size: xx-large; font-weight: bold">
          {{ flight.airline }}
        </mat-card-header>
        <br>
        <mat-card-content>
          <mat-card-subtitle>
            {{ flight.departure_airport }} - {{ flight.arrival_airport }}
          </mat-card-subtitle>
          <mat-card-subtitle>
            {{ flight.departure_date }}
          </mat-card-subtitle>
          <mat-card-subtitle>
            {{ flight.distance }} miles
          </mat-card-subtitle>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>View more</button>
        </mat-card-actions>
      </mat-card>
    }
  `,
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardActions,
    MatButton,
    MatCardSubtitle,
    MatCardContent
  ]
})
export class FlightCard {
  @Input() flight: Flight | undefined = undefined;

  constructor() {}
}
