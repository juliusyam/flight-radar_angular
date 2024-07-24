import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/authService';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  template: `
    <div style="display: flex; justify-content: space-between; align-items: center">
      <h1 style="margin: 0; font-size: xx-large; font-weight: bolder">
        Flight Radar - Laravel
      </h1>

      @if (isAuthenticated) {
        <button mat-stroked-button (click)="onLogout()">Logout</button>
      }
    </div>

    @if (isAuthenticated) {
      <mat-toolbar color="primary" style="gap: 1rem; margin-bottom: 2rem;">
        <a routerLink="/dashboard">Dashboard</a>
        <a routerLink="/flights">Flights</a>
      </mat-toolbar>
    }
    <router-outlet />
  `,
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatToolbar, MatToolbarRow, MatButton],
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
