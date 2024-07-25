import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { Flight, Note } from '../models/responses';
import { FlightCard } from '../components/flight-card.component';
import { FlightForm } from '../components/flight-form.component';
import { FlightPayload } from '../models/payloads';
import { FlightNotesService } from '../services/flight-notes.service';
import { NoteCard } from '../components/note-card.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-flight',
  template: `
    @if (flight) {
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <flight-card [flight]="flight" />

          <br>

          <h5 style="margin: 0;">Notes</h5>

          <section style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
            @for (note of notes; track note.id) {
              <note-card [note]="note" />
            }
          </section>

          <button mat-stroked-button (click)="viewNotes()">View and Update Notes</button>
        </div>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <flight-form [flight]="flight" (handleSubmit)="updateFlight($event)" />
          <button mat-stroked-button (click)="deleteFlight()">Delete Flight</button>
        </div>
      </div>
    }
  `,
  standalone: true,
  imports: [
    FlightCard,
    FlightForm,
    NoteCard,
    MatButton
  ],
})
export class FlightDetailsPage {
  flightId: number | undefined;
  flight: Flight | undefined = undefined;
  notes: Note[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private notesService: FlightNotesService,
  ) {
    this.route.params.subscribe(async param => {
      const flightId = parseInt(param['id'], 10);

      this.flightId = flightId;

      this.notesService.constructWithFlightId(flightId);
    });

    this.dashboardService.flightsObservable.subscribe(flights => {
      this.flight = flights.find(f => f.id === this.flightId);
    });

    this.notesService.notesObservable.subscribe(notes => this.notes = notes);
  }

  updateFlight(payload: FlightPayload) {
    if (this.flightId) this.dashboardService.editFlight(this.flightId, payload);
  }

  deleteFlight() {
    if (this.flightId) this.dashboardService.deleteFlight(this.flightId);
  }

  viewNotes() {
    this.router.navigate(['/flight', this.flightId, 'notes']);
  }
}
