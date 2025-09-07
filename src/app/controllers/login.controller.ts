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
  private _errorMessage = signal<string>("");

  private readonly _loadingRequest: Signal<boolean> = computed(() => this._loadingLoginUser());
  private readonly _error: Signal<string> = computed(() => this._errorMessage());

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
          /*this.userAuthController.user = {
            id: 1,
            fullName: "davier",
            userName: "davierperez",
            role: "admin"
          };
          this.router.navigate(['home', { outlets: {home_page: ['page']}}]);*/
        }
      }))
      .subscribe();
  }

  get loadingRequest(): Signal<boolean> {
    return this._loadingRequest;
  }

  get error(): Signal<string> {
    return this._error;
  }
}
