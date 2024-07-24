import { Component } from '@angular/core';
import { Flight, FlightStats } from '../models/responses';
import { DashboardService } from '../services/dashboardService';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { FlightStatsColumn } from '../components/flight-stats-column.component';
import dayjs from 'dayjs';
import { FlightCard } from '../components/flight-card.component';

@Component({
  selector: 'app-dashboard',
  template: `
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-top: 2rem">
      <flight-stats-column [flightStats]="flightStats" />

      <div style="display: flex; flex-direction: column; gap: 1rem">
        <h3 style="font-size: x-large; font-weight: bolder">Recent Flights</h3>

        @for (flight of lastFiveFlights; track flight.id) {
          <flight-card [flight]="flight" />
        }
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    FlightStatsColumn,
    FlightCard
  ],
})
export class DashboardPage {
  lastFiveFlights: Flight[] = [];
  flightStats: FlightStats | null = null;

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.flightsObservable.subscribe(flights => {
      this.lastFiveFlights = flights.sort((a, b) => {
        return dayjs(b.departure_date).isAfter(a.departure_date) ? 1 : -1
      }).slice(0, 5);
    });

    this.dashboardService.flightsStatsObservable.subscribe(flightStats => {
      this.flightStats = flightStats;
    });
  }

}
