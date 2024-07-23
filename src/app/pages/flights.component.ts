import { Component } from '@angular/core';
import { Flight, FlightStats } from '../models/responses';
import { DashboardService } from '../services/dashboardService';

@Component({
  selector: 'app-flights',
  template: `<p>Flights Page</p>`,
  standalone: true,
  imports: [],
})
export class FlightsPage {
  flights: Flight[] = [];

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.flightsObservable.subscribe(flights => {
      this.flights = flights;
    });
  }

}
