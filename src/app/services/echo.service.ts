import { EventEmitter, Injectable, Output } from '@angular/core';
import { AuthService } from './auth.service';
import Echo from 'laravel-echo';
import { FlightResponse, UserResponse } from '../models/responses';
import { DashboardService } from './dashboard.service';

interface EchoEstablishment {
  echo: Echo,
  userId: number,
}

const echoOptions = {
  broadcaster: 'reverb',
  key: 'my-app-key',
  wsHost: '127.0.0.1',
  wsPort: '8080',
  wssPort: '8080',
  forceTLS: false,
  enabledTransports: ['ws', 'wss'],
  authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
}

@Injectable({
  providedIn: 'root',
})
export class EchoService {

  @Output() echoEstablished: EventEmitter<EchoEstablishment> = new EventEmitter<EchoEstablishment>();

  constructor(private authService: AuthService, private dashboardService: DashboardService) {

    this.authService.userProvided.subscribe(userResponse => {
      console.log("Echo Service received user", userResponse.user.id, userResponse.user.name);
      this.constructEcho(userResponse);
    });

    this.echoEstablished.subscribe(({ echo, userId }) => {
      echo.private(`flights-private.${ userId }`)
        .listen('NewFlightAdded', (e: FlightResponse) => {
          console.log(e.flight);
          this.dashboardService.addFlightToList(e.flight);
        })
        .listen('FlightUpdated', (e: FlightResponse) => {
          console.log(e.flight);
        })
        .listen('FlightDeleted', (e: FlightResponse) => {
          console.log(e.flight);
        });

      echo.channel('flights')
        .listen('NewFlightAdded', (e: FlightResponse) => {
          console.log(e.flight);
        })
        .listen('FlightUpdated', (e: FlightResponse) => {
          console.log(e.flight);
        })
        .listen('FlightDeleted', (e: FlightResponse) => {
          console.log(e.flight);
        });
    });
  }

  start() {
    // Initialise Dashboard On Start Application
    const userResponse = this.authService.getUser();

    if (userResponse) {
      console.log("Echo Service got user" + userResponse);
      this.constructEcho(userResponse);
    }
  }

  private constructEcho(userResponse: UserResponse) {
    this.echoEstablished.emit({
      echo: new Echo({
        ...echoOptions,
        auth: {
          headers: {
            Authorization: `Bearer ${ userResponse.token }`,
            Accept: 'application/json'
          }
        }
      }),
      userId: userResponse.user.id,
    })
  }
}
