import { Routes } from '@angular/router';
import { LoginPage } from './pages/login.component';
import { DashboardPage } from './pages/dashboard.component';
import { FlightsPage } from './pages/flights.component';
import { AuthGuard } from './middleware/auth-guard.middleware';
import { UnauthenticatedGuard } from './middleware/unauthenticated-guard.middleware';
import { FlightDetailsPage } from './pages/flight.component';
import { NotesPage } from './pages/notes.component';
import { FlightNotesService } from './services/flight-notes.service';

export const routes: Routes = [
  {
    path: '',
    title: 'Login Page',
    component: LoginPage,
    canActivate: [UnauthenticatedGuard]
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
  },
  {
    path: 'flight/:id',
    children: [
      {
        path: '',
        component: FlightDetailsPage,
      },
      {
        path: 'notes',
        component: NotesPage,
      },
    ],
    canActivate: [AuthGuard],
    providers: [FlightNotesService]
  }
];
