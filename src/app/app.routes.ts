import {Routes} from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {HomeRoute} from './routes/home.route';
import {PanelRoute} from './routes/panel.route';

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: 'home',
    loadComponent: () => import('./components/main-home/main-home.component').then(value => value.MainHomeComponent),
    children: HomeRoute
  },
  {
    path: "setting",
    loadComponent: () => import('./components/panel/panel-main/panel-main.component').then(value => value.PanelMainComponent),
    children: PanelRoute
  }
];
