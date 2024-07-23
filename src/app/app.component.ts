import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <h1>Flight Radar - Laravel</h1>
    <nav>
      <a routerLink="/">Login</a>
      |
      <a routerLink="/dashboard">Dashboard</a>
      |
      <a routerLink="/flights">Flights</a>
    </nav>
    <router-outlet />
  `,
  standalone: true,
  imports: [RouterLink, RouterOutlet],
})
export class AppComponent {}
