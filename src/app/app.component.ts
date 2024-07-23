import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/authService';
import { UserResponse } from './models/responses';

@Component({
  selector: 'app-root',
  template: `
    <h1>Flight Radar - Laravel</h1>
    @if (isAuthenticated) {
      <nav>
        <a routerLink="/dashboard">Dashboard</a>
        |
        <a routerLink="/flights">Flights</a>
      </nav>

      <button (click)="onLogout()">Logout</button>
    }
    <router-outlet />
  `,
  standalone: true,
  imports: [RouterLink, RouterOutlet],
})
export class AppComponent {

  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.userProvided.subscribe({
      next: () => this.isAuthenticated = true
    });

    this.authService.userRemoved.subscribe({
      next: () => this.isAuthenticated = false
    });
  }

  onLogout() {
    this.authService.logout(() => this.router.navigate(['/']));
  }
}
