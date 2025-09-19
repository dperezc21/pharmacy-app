import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {UserAuthenticatedController} from '../../controllers/user-authenticated.controller';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmMessageComponent} from '../confirm-message/confirm-message.component';
import {tap} from 'rxjs';
import {ConfirmMessageData} from '../../models/confirm-message-data';

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
  private readonly dialog = inject(MatDialog);
  private readonly userAuthController = inject(UserAuthenticatedController);

  goAccount() {
    this.router.navigate(['setting', { outlets: {panel: ['account']}}]);
  }

  goHomeRoutes(routeMain: string, routeChildren: string): void {
    this.router.navigate([routeMain, {outlets: {home_page: [routeChildren]}}])
  }

  doLogout() {
    const description = `¿ Esta seguro que quiere cerrar sesion ?`;
    const infoData: ConfirmMessageData = { type: 'info', title: "Cerrando sesion", description };
    this.dialog.open(ConfirmMessageComponent, {
      width: '420px',
      data: infoData,
    }).beforeClosed().pipe(tap(value => {
      if(value) {
        this.userAuthController.resetUserToken();
        this.router.navigate(['login']);
      }
    }));
  }
}
