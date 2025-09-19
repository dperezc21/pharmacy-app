import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserAuthenticatedController} from '../controllers/user-authenticated.controller';
import {interval} from 'rxjs';

export const userAuthenticatedGuard: CanActivateFn = (route, state) => {
  const userAuthenticatedController = inject(UserAuthenticatedController);
  const routerUrl: Router = inject(Router);
  const INTERVAL_TIME_ONE_HOUR: number = 1000 * 60;
  interval(INTERVAL_TIME_ONE_HOUR).subscribe(() => {
    if(!userAuthenticatedController.userTokenGot()) routerUrl.navigate(['login']);
  });

  if(!userAuthenticatedController.userAuthenticated()?.id) {
    routerUrl.navigate(['login']);
    return false;
  }
  return true;
};
