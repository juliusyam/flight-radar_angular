import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <h3>Login Page</h3>
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <label>
        Email
        <input type="text" formControlName="email" name="email" />
      </label>
      <label>
        Password
        <input type="password" formControlName="password" name="password" />
      </label>
      <button type="submit" [disabled]="!loginForm.valid">Submit</button>
    </form>
  `,
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
})
export class LoginPage {

  constructor(private authService: AuthService, private router: Router) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    }, () => {
      this.router.navigate(['/dashboard']);
    });
  }
}
