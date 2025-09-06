import {Routes} from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {HomeRoute} from './routes/home.route';
import {userAuthenticatedGuard} from './guards/user-authenticated.guard';

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
    path: "home",
    loadComponent: () => import('./components/main-home/main-home.component').then(value => value.MainHomeComponent),
    children: HomeRoute
  }
];
