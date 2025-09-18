import {computed, Injectable, Signal, signal} from '@angular/core';
import {AuthUserService} from '../services/auth-user.service';
import {UserAuth} from '../models/user.models';
import {takeUntil, tap} from 'rxjs';
import {DestroySubject} from '../services/destroy-subject.service';
import {SnackBarService} from '../services/snack-bar.service';
import {Router} from '@angular/router';
import {UserAuthenticatedController} from './user-authenticated.controller';

@Injectable({ providedIn: 'root' })
export class LoginController extends DestroySubject {

  private _loadingLoginUser = signal<boolean>(false);

  private readonly _loadingRequest: Signal<boolean> = computed(() => this._loadingLoginUser());

  constructor(private authUserService: AuthUserService,
              private snackBarService: SnackBarService,
              private router: Router,
              private userAuthController: UserAuthenticatedController) {
    super();}

  loginAuth(user: UserAuth): void {
    this._loadingLoginUser.set(true);
    this.authUserService.loginUser(user)
      .pipe(takeUntil(this.destroy$),tap({
        next: value => {
          this._loadingLoginUser.set(false);
          if(value?.id) {
            this.userAuthController.user = {...value, role: value.role.toLowerCase()};
            this.router.navigate(['home', { outlets: {home_page: ['page']}}]);
          }
        },
        error: () => {
          this.snackBarService.showMessage("usuario y/o contraseña incorrecta")
          this._loadingLoginUser.set(false);
        }
      }))
      .subscribe();
  }

  get loadingRequest(): Signal<boolean> {
    return this._loadingRequest;
  }
}
