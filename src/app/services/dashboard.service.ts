import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Flight, FlightStats } from '../models/responses';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { FlightPayload } from '../models/payloads';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private flightsSubject = new BehaviorSubject<Flight[]>([]);
  flightsObservable = this.flightsSubject.asObservable();

  private flightStatsSubject = new BehaviorSubject<FlightStats | null>(null);
  flightsStatsObservable = this.flightStatsSubject.asObservable();

  private headers = new HttpHeaders();

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    // Initialise Dashboard On Load Application
    const token = this.authService.getUser()?.token;
    if (token) {
      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${ token }`
      });

      this.initializeDashboard();
    }

    // Initialise Dashboard On Change User
    this.authService.userProvided.subscribe(userResponse => {
      const token = userResponse.token;

      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${ token }`
      });

      this.initializeDashboard();
    });

    this.authService.userRemoved.subscribe(() => this.clearDashboard());
  }

  initializeDashboard() {
    this.httpClient.get<Flight[]>(environment.baseUrl + '/api/flights', { headers: this.headers })
      .subscribe(flights => this.flightsSubject.next(flights));

    this.httpClient.get<FlightStats>(environment.baseUrl + '/api/flight-stats', { headers: this.headers })
      .subscribe(flightStats => this.flightStatsSubject.next(flightStats));
  }

  clearDashboard() {
    this.flightsSubject.next([]);
    this.flightStatsSubject.next(null);
  }

  addFlight(payload: FlightPayload) {
    this.httpClient.post<Flight>(environment.baseUrl + '/api/flights', payload, { headers: this.headers })
      .subscribe(flight => this.addFlightToList(flight));
  }

  addFlightToList(flight: Flight) {
    const flights = this.flightsSubject.value;

    flights.push(flight);

    this.flightsSubject.next(flights);
  }

  editFlight(flightId: number, payload: FlightPayload) {
    this.httpClient.put<Flight>(environment.baseUrl + `/api/flights/${ flightId }`, payload, { headers: this.headers })
      .subscribe(flight => {
        const flights = this.flightsSubject.value;

        const index = flights.findIndex(f => f.id === flight.id);
        if (index >= 0) flights.splice(index, 1, flight);

        this.flightsSubject.next(flights);
      });
  }

  deleteFlight(flightId: number, onSuccess:() => void) {
    this.httpClient.delete(environment.baseUrl + `/api/flights/${ flightId }`, { headers: this.headers })
      .subscribe(() => {
        const flights = this.flightsSubject.value;

        const index = flights.findIndex(f => f.id === flightId);
        if (index >= 0) flights.splice(index, 1);

        this.flightsSubject.next(flights);

        onSuccess();
      });
  }
}
