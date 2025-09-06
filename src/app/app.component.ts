import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeHeaderComponent} from './components/home-header/home-header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pharmacy-app';
}
