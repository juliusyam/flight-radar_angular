import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<h1>Flight Radar - Laravel</h1>`,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {}
