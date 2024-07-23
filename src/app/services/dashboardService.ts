import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Flight, FlightStats } from '../models/responses';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './authService';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private flightsSubject = new BehaviorSubject<Flight[]>([]);
  flightsObservable = this.flightsSubject.asObservable();

  private flightStatsSubject = new BehaviorSubject<FlightStats | null>(null);
  flightsStatsObservable = this.flightStatsSubject.asObservable();

  constructor(private httpClient: HttpClient, authService: AuthService) {
    const token = authService.getUser()?.token;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ token }`
    });

    this.httpClient.get<Flight[]>('http://localhost:8000/api/flights', { headers })
      .subscribe(response => {
        console.log(response);
        this.flightsSubject.next(response);
      });

    this.httpClient.get<FlightStats>('http://localhost:8000/api/flight-stats', { headers })
      .subscribe(response => {
        console.log(response);
        this.flightStatsSubject.next(response);
      });
  }
}
