import {Routes} from '@angular/router';
import {UserAccountComponent} from '../components/panel/user-account/user-account.component';
import {userAuthenticatedGuard} from '../guards/user-authenticated.guard';
import {UserMainComponent} from '../components/panel/user-main/user-main.component';

export const PanelRoute: Routes = [
  {
    path: "account",
    component: UserAccountComponent,
    outlet: 'panel',
    canActivate: [userAuthenticatedGuard]
  },
  {
    path: "users",
    component: UserMainComponent,
    outlet: 'panel',
    canActivate: [userAuthenticatedGuard]
  }
] as Routes;
