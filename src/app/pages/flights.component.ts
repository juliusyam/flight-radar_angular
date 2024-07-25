import { Component } from '@angular/core';
import { Flight } from '../models/responses';
import { DashboardService } from '../services/dashboard.service';
import { FlightCard } from '../components/flight-card.component';
import { FlightForm } from '../components/flight-form.component';
import { FlightPayload } from '../models/payloads';

@Component({
  selector: 'app-flights',
  template: `
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-top: 2rem;">
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
        @for (flight of flights; track flight.id) {
          <flight-card [flight]="flight" />
        }
      </div>
      <flight-form (handleSubmit)="createFlight($event)" />
    </div>
  `,
  standalone: true,
  imports: [
    FlightCard,
    FlightForm
  ],
})
export class FlightsPage {
  flights: Flight[] = [];

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.flightsObservable.subscribe(flights => {
      this.flights = flights;
    });
  }

  createFlight(payload: FlightPayload) {
    this.dashboardService.addFlight(payload);
  }
}
