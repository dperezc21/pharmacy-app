import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HomeHeaderComponent} from '../../home-header/home-header.component';

@Component({
  selector: 'app-panel-main',
  imports: [
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    HomeHeaderComponent
  ],
  templateUrl: './panel-main.component.html',
  standalone: true,
  styleUrl: './panel-main.component.css'
})
export class PanelMainComponent {

}
