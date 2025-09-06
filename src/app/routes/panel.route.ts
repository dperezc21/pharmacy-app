import {Routes} from '@angular/router';
import {UserTableComponent} from '../components/panel/user-table/user-table.component';
import {UserAccountComponent} from '../components/panel/user-account/user-account.component';

export const PanelRoute: Routes = [
  {
    path: "account",
    component: UserAccountComponent,
    outlet: 'panel'
  },
  {
    path: "users",
    component: UserTableComponent,
    outlet: 'panel'
  }
] as Routes;
