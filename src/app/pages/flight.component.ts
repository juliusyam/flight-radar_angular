import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../services/dashboardService';
import { Flight } from '../models/responses';
import { FlightCard } from '../components/flight-card.component';
import { FlightForm } from '../components/flight-form.component';
import { FlightPayload } from '../models/payloads';

@Component({
  selector: 'app-flight',
  template: `
    @if (flight) {
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
        <flight-card [flight]="flight" />
        <flight-form [flight]="flight" (handleSubmit)="updateFlight($event)" />
      </div>
    }
  `,
  standalone: true,
  imports: [
    FlightCard,
    FlightForm
  ]
})
export class FlightDetailsPage {
  flightId: number | undefined;
  flight: Flight | undefined = undefined;

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService) {
    this.route.params.subscribe(async param => {
      this.flightId = parseInt(param['id'], 10);
    });

    this.dashboardService.flightsObservable.subscribe(flights => {
      this.flight = flights.find(f => f.id === this.flightId);
    });
  }

  updateFlight(payload: FlightPayload) {
    if (this.flight?.id) this.dashboardService.editFlight(this.flight.id, payload);
  }
}
