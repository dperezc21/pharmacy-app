import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {LoginController} from '../controllers/login.controller';

export const userAuthenticatedGuard: CanActivateFn = (route, state) => {
  const loginController = inject(LoginController);
  console.log(loginController.userAuthenticated())
  return true;
};
