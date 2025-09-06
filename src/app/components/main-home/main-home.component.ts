import { Component } from '@angular/core';
import {HomeHeaderComponent} from '../home-header/home-header.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-home',
  imports: [
    RouterOutlet,
    HomeHeaderComponent
  ],
  templateUrl: './main-home.component.html',
  standalone: true,
  styleUrl: './main-home.component.css'
})
export class MainHomeComponent {

}
