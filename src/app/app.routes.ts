import { Routes } from '@angular/router';
import { LoginPage } from './pages/login.component';
import { DashboardPage } from './pages/dashboard.component';
import { FlightsPage } from './pages/flights.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Login Page',
    component: LoginPage,
  },
  {
    path: 'dashboard',
    title: 'Dashboard Page',
    component: DashboardPage,
  },
  {
    path: 'flights',
    title: 'Flights Page',
    component: FlightsPage,
  }
];
