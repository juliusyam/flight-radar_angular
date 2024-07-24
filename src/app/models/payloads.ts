import { FormControl } from '@angular/forms';

export interface LoginPayload {
  email: string,
  password: string,
}

export interface FlightPayload {
  departure_date?: Date,
  flight_number?: string,
  departure_airport?: string,
  arrival_airport?: string,
  distance?: number,
  airline?: string,
}

export interface FlightFormGroup {
  departure_date: FormControl<Date>,
  flight_number: FormControl<string>,
  departure_airport: FormControl<string>,
  arrival_airport: FormControl<string>,
  distance: FormControl<number>,
  airline: FormControl<string>,
}
