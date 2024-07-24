import { Component, Input } from '@angular/core';
import { FlightStats } from '../models/responses';
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import {
  MatExpansionPanel, MatExpansionPanelActionRow,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import { MatButton } from '@angular/material/button';
import { KeyValuePipe, NgForOf } from '@angular/common';

@Component({
  selector: 'flight-stats-column',
  template: `
    @if (flightStats) {
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <section style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem">
          <mat-card appearance="outlined">
            <mat-card-content>
              <mat-card-title>Total Flights</mat-card-title>
              <br>
              <mat-card-subtitle style="font-size: xx-large; font-weight: bold">
                {{ flightStats.total_flights }}
              </mat-card-subtitle>
            </mat-card-content>
          </mat-card>
          <mat-card appearance="outlined">
            <mat-card-content>
              <mat-card-title>Total Distance</mat-card-title>
              <br>
              <mat-card-subtitle style="font-size: xx-large; font-weight: bold">
                {{ flightStats.total_distance }} miles
              </mat-card-subtitle>
            </mat-card-content>
          </mat-card>
        </section>

        <section style="display: flex; flex-direction: column; gap: 1rem;">
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>Most Used Airports</mat-panel-title>
              <mat-panel-description>
                {{ Object.keys(flightStats.top_airports).length }} total airports
              </mat-panel-description>
            </mat-expansion-panel-header>
            <div *ngFor="let airport of flightStats.top_airports | keyvalue">
              <span>{{ airport.key }}: {{ airport.value }}</span>
            </div>
          </mat-expansion-panel>
        </section>

        <section style="display: flex; flex-direction: column; gap: 1rem;">
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>Most Used Airlines</mat-panel-title>
              <mat-panel-description>
                {{ Object.keys(flightStats.top_airlines).length }} total airlines
              </mat-panel-description>
            </mat-expansion-panel-header>
            <div *ngFor="let airport of flightStats.top_airlines | keyvalue">
              <span>{{ airport.key }}: {{ airport.value }}</span>
            </div>
          </mat-expansion-panel>
        </section>
      </div>
    }
  `,
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatToolbar,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatButton,
    MatExpansionPanelActionRow,
    KeyValuePipe,
    NgForOf,
  ]
})
export class FlightStatsColumn {
  @Input() flightStats: FlightStats | null = null;
  protected readonly Object = Object;
}
