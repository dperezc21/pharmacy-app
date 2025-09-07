import {Routes} from '@angular/router';
import {UserTableComponent} from '../components/panel/user-table/user-table.component';
import {UserAccountComponent} from '../components/panel/user-account/user-account.component';
import {userAuthenticatedGuard} from '../guards/user-authenticated.guard';

export const PanelRoute: Routes = [
  {
    path: "account",
    component: UserAccountComponent,
    outlet: 'panel',
    canActivate: [userAuthenticatedGuard]
  },
  {
    path: "users",
    component: UserTableComponent,
    outlet: 'panel',
    canActivate: [userAuthenticatedGuard]
  }
] as Routes;
