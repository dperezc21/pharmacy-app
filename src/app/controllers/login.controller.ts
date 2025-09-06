import {computed, Injectable, Signal, signal} from '@angular/core';
import {AuthUserService} from '../services/auth-user.service';
import {User, UserAuth} from '../models/user.models';
import {takeUntil, tap} from 'rxjs';
import {DestroySubject} from '../services/destroy-subject.service';
import {SnackBarService} from '../services/snack-bar.service';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginController extends DestroySubject {

  private _loadingLoginUser = signal<boolean>(false);
  private _errorMessage = signal<string>("");
  private _user = signal<User | null>(null);

  private readonly _loadingRequest: Signal<boolean> = computed(() => this._loadingLoginUser());
  private readonly _error: Signal<string> = computed(() => this._errorMessage());
  private readonly _userAuthenticated: Signal<User | null> = computed(() => this._user());

  constructor(private authUserService: AuthUserService,
              private snackBarService: SnackBarService,
              private router: Router) {
    super();}

  loginAuth(user: UserAuth): void {
    this._loadingLoginUser.set(true);
    this.authUserService.loginUser(user)
      .pipe(takeUntil(this.destroy$),tap({
        next: value => {
          this._loadingLoginUser.set(false);
          if(value?.id) {
            this._user.set(value);
            this.router.navigate(['home', { outlets: {home_page: ['page']}}]);
          }
        },
        error: () => {
          this.snackBarService.showMessage("usuario y/o contraseña incorrecta")
          this._loadingLoginUser.set(false);
          this._user.set({
            id: 1,
            fullName: "davier",
            userName: "davierperez",
            role: "admin"
          });
          this.router.navigate(['home', { outlets: {home_page: ['page']}}]);
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


  get userAuthenticated(): Signal<User | null> {
    return this._userAuthenticated;
  }
}
