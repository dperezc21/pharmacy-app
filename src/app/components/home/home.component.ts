import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
    imports: [],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private readonly router = inject(Router);

  goHomeRoutes(routeMain: string, routeChildren: string): void {
    this.router.navigate([routeMain, {outlets: {home_page: [routeChildren]}}])
  }

}
