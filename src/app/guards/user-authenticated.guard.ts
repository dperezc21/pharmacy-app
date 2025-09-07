import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserAuthenticatedController} from '../controllers/user-authenticated.controller';

export const userAuthenticatedGuard: CanActivateFn = (route, state) => {
  const userAuthenticatedController = inject(UserAuthenticatedController);
  const routerUrl: Router = inject(Router);
  if(!userAuthenticatedController.userAuthenticated()?.id) {
    routerUrl.navigate(['login']);
    return false;
  }
  return true;
};
