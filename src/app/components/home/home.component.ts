import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {HomeHeaderComponent} from "../home-header/home-header.component";

@Component({
  selector: 'app-home',
    imports: [
        RouterLink
    ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
