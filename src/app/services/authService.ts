import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginPayload } from '../models/payloads';
import { UserResponse } from '../models/responses';
import { map, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  login(payload: LoginPayload): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>('http://localhost:8000/api/login', payload);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const isExpired = new JwtHelperService().isTokenExpired(token);
    return !isExpired;
  }
}
