import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginPayload } from '../models/payloads';
import { User, UserResponse } from '../models/responses';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  @Output() userProvided: EventEmitter<UserResponse> = new EventEmitter<UserResponse>();
  @Output() userRemoved: EventEmitter<null> = new EventEmitter<null>();

  login(payload: LoginPayload, onSuccess: (response: UserResponse) => void) {
    this.httpClient.post<UserResponse>(environment.baseUrl + '/api/login', payload)
      .subscribe(response => {
        this.setUser(response);
        onSuccess(response);
      });
  }

  logout(onSuccess: () => void) {
    this.removeUser();
    onSuccess();
  }

  public isAuthenticated(): boolean {
    const user = this.getUser();

    const isExpired = new JwtHelperService().isTokenExpired(user?.token ?? null);

    if (!user || isExpired) {
      this.userRemoved.emit(null);
    } else {
      this.userProvided.emit(user);
    }

    return !isExpired;
  }

  private setUser(response: UserResponse) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.userProvided.emit(response);
  }

  public getUser(): UserResponse | null {
     const token = localStorage.getItem('token');
     const userString = localStorage.getItem('user');

     if (!token || !userString) return null;

     const user = JSON.parse(userString) as User;
     return { token, user };
  }

  private removeUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userRemoved.emit(null);
  }
}
