import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {LoginController} from '../controllers/login.controller';

export const userAuthenticatedGuard: CanActivateFn = (route, state) => {
  const loginController = inject(LoginController);
  const routerUrl: Router = inject(Router);
  if(!loginController.userAuthenticated()?.id) {
    routerUrl.navigate(['login']);
    return false;
  }
  return true;
};
