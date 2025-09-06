import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-home-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './home-header.component.html',
  standalone: true,
  styleUrl: './home-header.component.css'
})
export class HomeHeaderComponent {

  private readonly router = inject(Router);

  goAccount() {
    this.router.navigate(['setting', { outlets: {panel: ['account']}}]);
  }

  goHomeRoutes(routeMain: string, routeChildren: string): void {
    this.router.navigate([routeMain, {outlets: {home_page: [routeChildren]}}])
  }
}
