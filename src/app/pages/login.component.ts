import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/authService';
import { Router } from '@angular/router';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-login',
  template: `
    <div style="display: grid; place-items: center; margin-top: 25vh;">
      <mat-card appearance="outlined" style="max-width: 40rem; width: 100%; ">
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" style="display: grid; gap: 1rem;">
            <mat-form-field appearance="fill">
              <mat-label>Email</mat-label>
              <input type="text" placeholder="Email" formControlName="email" name="email" matInput />
            </mat-form-field>
            <mat-form-field  appearance="fill">
              <mat-label>Password</mat-label>
              <input type="password" placeholder="Password" formControlName="password" name="password" matInput />
            </mat-form-field>
            <button mat-flat-button type="submit" [disabled]="!loginForm.valid">Submit</button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatButtonModule,
    MatInput,
    MatCard,
    MatCardContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {

  constructor(private authService: AuthService, private router: Router) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: Validators.required })
  });

  onSubmit() {
    this.authService.login(this.loginForm.value, () => {
      this.router.navigate(['/dashboard']);
    });
  }
}
