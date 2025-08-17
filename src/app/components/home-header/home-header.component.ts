import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home-header',
  imports: [
    RouterLink
  ],
  templateUrl: './home-header.component.html',
  standalone: true,
  styleUrl: './home-header.component.css'
})
export class HomeHeaderComponent {

}
