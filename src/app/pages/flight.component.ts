import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../services/dashboardService';
import { Flight } from '../models/responses';
import { FlightCard } from '../components/flight-card.component';

@Component({
  selector: 'app-flight',
  template: `
    <flight-card [flight]="flight" />
  `,
  standalone: true,
  imports: [
    FlightCard
  ]
})
export class FlightDetailsPage {
  flight: Flight | undefined = undefined;

  constructor(private route: ActivatedRoute, dashboardService: DashboardService) {
    this.route.params.subscribe(param => {
      this.flight = dashboardService.getFlightById(parseInt(param['id'], 10));
    });
  }
}
