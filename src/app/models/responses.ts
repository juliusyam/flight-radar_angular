export interface UserResponse {
  user: User,
  token: string,
}

export interface User {
  id: number,
  name: string,
  email: string,
  email_verified_at?: Date,
  created_at: Date,
  updated_at?: Date,
}

export interface Flight {
  id: number,
  departure_date: Date,
  flight_number: string,
  departure_airport: string,
  arrival_airport: string,
  distance: number,
  airline: string,
  created_at: Date,
  updated_at: Date,
  user_id: number,
}

export interface FlightResponse {
  flight: Flight,
}

export interface FlightStats {
  total_flights: number,
  total_distance: number,
  top_airports: Record<string, number>,
  top_airlines: Record<string, number>
}

export interface Note {
  id: number,
  title: string,
  body: string,
  user_id: number,
  flight_id: number,
  flight?: Flight,
}
