import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UnauthenticatedGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
