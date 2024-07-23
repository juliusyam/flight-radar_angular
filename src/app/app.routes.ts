import { Routes } from '@angular/router';
import { LoginPage } from './pages/login.component';
import { DashboardPage } from './pages/dashboard.component';
import { FlightsPage } from './pages/flights.component';
import { AuthGuard } from './services/authGuard';
import { LoginAuthGuard } from './services/loginAuthGuard';

export const routes: Routes = [
  {
    path: '',
    title: 'Login Page',
    component: LoginPage,
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'dashboard',
    title: 'Dashboard Page',
    component: DashboardPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'flights',
    title: 'Flights Page',
    component: FlightsPage,
    canActivate: [AuthGuard],
  }
];
