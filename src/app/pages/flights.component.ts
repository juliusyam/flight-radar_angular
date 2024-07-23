import { Component } from '@angular/core';
import { Flight } from '../models/responses';
import { DashboardService } from '../services/dashboardService';
import { FlightCard } from '../components/flight-card.component';

@Component({
  selector: 'app-flights',
  template: `
    <div class="flights-container">
      @for (flight of flights; track flight.id) {
        <flight-card [flight]="flight" />
      }
    </div>
  `,
  standalone: true,
  imports: [
    FlightCard
  ],
})
export class FlightsPage {
  flights: Flight[] = [];

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.flightsObservable.subscribe(flights => {
      this.flights = flights;
    });
  }

}
