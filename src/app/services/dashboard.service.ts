import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Flight, FlightStats } from '../models/responses';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { FlightPayload } from '../models/payloads';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private flightsSubject = new BehaviorSubject<Flight[]>([]);
  flightsObservable = this.flightsSubject.asObservable();

  private flightStatsSubject = new BehaviorSubject<FlightStats | null>(null);
  flightsStatsObservable = this.flightStatsSubject.asObservable();

  private headers = new HttpHeaders();

  constructor(private httpClient: HttpClient, authService: AuthService) {
    const token = authService.getUser()?.token;
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${ token }`
    });

    this.httpClient.get<Flight[]>('http://localhost:8000/api/flights', { headers: this.headers })
      .subscribe(flights => this.flightsSubject.next(flights));

    this.httpClient.get<FlightStats>('http://localhost:8000/api/flight-stats', { headers: this.headers })
      .subscribe(flightStats => this.flightStatsSubject.next(flightStats));
  }

  addFlight(payload: FlightPayload) {
    this.httpClient.post<Flight>('http://localhost:8000/api/flights', payload, { headers: this.headers })
      .subscribe(flight => {
        const flights = this.flightsSubject.value;

        flights.push(flight);

        this.flightsSubject.next(flights);
      });
  }

  editFlight(flightId: number, payload: FlightPayload) {
    this.httpClient.put<Flight>(`http://localhost:8000/api/flights/${ flightId }`, payload, { headers: this.headers })
      .subscribe(flight => {
        const flights = this.flightsSubject.value;

        const index = flights.findIndex(f => f.id === flight.id);
        if (index >= 0) flights.splice(index, 1, flight);

        this.flightsSubject.next(flights);
      });
  }

  deleteFlight(flightId: number) {
    this.httpClient.delete(`http://localhost:8000/api/flights/${ flightId }`, { headers: this.headers })
      .subscribe(() => {
        const flights = this.flightsSubject.value;

        const index = flights.findIndex(f => f.id === flightId);
        if (index >= 0) flights.splice(index, 1);

        this.flightsSubject.next(flights);
      });
  }
}
