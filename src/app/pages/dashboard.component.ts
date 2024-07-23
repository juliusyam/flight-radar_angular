import { Component } from '@angular/core';
import { Flight, FlightStats } from '../models/responses';
import { DashboardService } from '../services/dashboardService';

@Component({
  selector: 'app-dashboard',
  template: `<p>Dashboard Page</p>`,
  standalone: true,
  imports: [],
})
export class DashboardPage {
  flights: Flight[] = [];
  flightStats: FlightStats | null = null;

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.flightsObservable.subscribe(flights => {
      this.flights = flights;
    });

    this.dashboardService.flightsStatsObservable.subscribe(flightStats => {
      this.flightStats = flightStats;
    });
  }

}
