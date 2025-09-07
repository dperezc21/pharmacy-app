import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HomeHeaderComponent} from '../../home-header/home-header.component';
import {UserAuthenticatedController} from '../../../controllers/user-authenticated.controller';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-panel-main',
  imports: [
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    HomeHeaderComponent,
    NgIf
  ],
  templateUrl: './panel-main.component.html',
  standalone: true,
  styleUrl: './panel-main.component.css'
})
export class PanelMainComponent {

  constructor(protected userAuthController: UserAuthenticatedController) {}

}
