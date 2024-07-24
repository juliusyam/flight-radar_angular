import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Flight, FlightStats } from '../models/responses';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './authService';
import { FlightPayload } from '../models/payloads';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private flightsSubject = new BehaviorSubject<Flight[]>([]);
  flightsObservable = this.flightsSubject.asObservable();

  private flightStatsSubject = new BehaviorSubject<FlightStats | null>(null);
  flightsStatsObservable = this.flightStatsSubject.asObservable();

  headers = new HttpHeaders();

  constructor(private httpClient: HttpClient, authService: AuthService) {
    const token = authService.getUser()?.token;
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${ token }`
    });

    this.httpClient.get<Flight[]>('http://localhost:8000/api/flights', { headers: this.headers })
      .subscribe(response => {
        console.log(response);
        this.flightsSubject.next(response);
      });

    this.httpClient.get<FlightStats>('http://localhost:8000/api/flight-stats', { headers: this.headers })
      .subscribe(response => {
        console.log(response);
        this.flightStatsSubject.next(response);
      });
  }

  getFlightById(flightId: number): Flight | undefined {
    return this.flightsSubject.value.find(f => f.id === flightId);
  }

  addFlight(payload: FlightPayload) {
    this.httpClient.post<Flight>('http://localhost:8000/api/flights', payload, { headers: this.headers })
      .subscribe(response => {
        console.log(response);
        const flights = this.flightsSubject.value;
        flights.push(response);
        this.flightsSubject.next(flights);
      });
  }
}
