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
  departure_date: string,
  flight_number: string,
  departure_airport: string,
  arrival_airport: string,
  distance: number,
  airline: string,
  created_at: Date,
  updated_at: Date,
  user_id: number,
}
