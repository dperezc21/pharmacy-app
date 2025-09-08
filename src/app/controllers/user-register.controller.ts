import {computed, Injectable, Signal, signal} from '@angular/core';
import {AuthUserService} from '../services/auth-user.service';
import {User} from '../models/user.models';
import {iif, map, Observable, takeUntil, tap} from 'rxjs';
import {SnackBarService} from '../services/snack-bar.service';
import {DestroySubject} from '../services/destroy-subject.service';

@Injectable({ providedIn: 'root' })
export class UserRegisterController extends DestroySubject {
  private _loadingRegisterUser = signal<boolean>(false);
  private _errorMessage = signal<string>("");

  private readonly _loadingRequest: Signal<boolean> = computed(() => this._loadingRegisterUser());
  private readonly _error: Signal<string> = computed(() => this._errorMessage());

  constructor(private authUserService: AuthUserService, private snackBarService: SnackBarService) {
    super();}

  registerUser(dataUser: User): Observable<User> {
    return this.authUserService.registerUser(dataUser)
      .pipe(tap({
        next: () => this.snackBarService.showMessage("Usuario registrado con exito"),
        error: () => {
          this.snackBarService.showMessage("Error inesperado al guardar usuario")
          this._errorMessage.set("Error para registrar usuario inesperado");
        }
      }))
  }

  updateDataUser(dataUser: User): Observable<User> {
    return this.authUserService.updateUser(dataUser)
      .pipe(tap({
        next: () => this.snackBarService.showMessage("Usuario editado con exito"),
      error: () => {
        this.snackBarService.showMessage("Error inesperado al editar usuario");
        this._errorMessage.set("Error para registrar usuario inesperado");
      }
    }));
  }

  saveOrUpdateUser(user: User): Observable<User> {
    this._loadingRegisterUser.set(true);
    return iif(() => !!user?.id, this.updateDataUser(user), this.registerUser(user))
      .pipe(takeUntil(this.destroy$),
        map(value => { return {...value, role: value.role.toLowerCase()} }), tap({
        next: (value: User) => {
          this._loadingRegisterUser.set(false);
        }, error: () => this._loadingRegisterUser.set(false)
      }));
  }

  get loadingRequest(): Signal<boolean> {
    return this._loadingRequest;
  }

  get error(): Signal<string> {
    return this._error;
  }
}
