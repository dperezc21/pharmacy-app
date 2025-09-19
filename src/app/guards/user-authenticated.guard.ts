import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserAuthenticatedController} from '../controllers/user-authenticated.controller';
import {interval, switchMap, takeWhile, tap} from 'rxjs';
import {AuthUserService} from '../services/auth-user.service';

export const userAuthenticatedGuard: CanActivateFn = (route, state) => {
  const userAuthenticatedController: UserAuthenticatedController = inject(UserAuthenticatedController);
  const authUserService: AuthUserService = inject(AuthUserService);
  const routerUrl: Router = inject(Router);
  const INTERVAL_TIME_ONE_HOUR: number = 1000 * 60;

  interval(INTERVAL_TIME_ONE_HOUR)
    .pipe(takeWhile(() => !!userAuthenticatedController.userTokenGot()),
    switchMap(() => {
    return authUserService.verifyToken().pipe(tap({
      error: () => {
        userAuthenticatedController.resetUserToken();
        routerUrl.navigate(['login'])
      }
    }))
  })).subscribe();

  if(!userAuthenticatedController.userAuthenticated()?.id) {
    routerUrl.navigate(['login']);
    return false;
  }
  return true;
};
