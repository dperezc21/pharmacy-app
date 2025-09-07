import {computed, Injectable, Signal, signal} from '@angular/core';
import {AuthUserService} from '../services/auth-user.service';
import {User} from '../models/user.models';
import {iif, Observable, tap} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserRegisterController {
  private _loadingRegisterUser = signal<boolean>(false);
  private _errorMessage = signal<string>("");

  private readonly _loadingRequest: Signal<boolean> = computed(() => this._loadingRegisterUser());
  private readonly _error: Signal<string> = computed(() => this._errorMessage());

  constructor(private authUserService: AuthUserService) {}

  registerUser(dataUser: User): Observable<User> {
    return this.authUserService.registerUser(dataUser)
      .pipe(tap({
        error: () => {
          this._errorMessage.set("Error para registrar usuario inesperado");
        }
      }))
  }

  updateDataUser(dataUser: User): Observable<User> {
    return this.authUserService.updateUser(dataUser)
      .pipe(tap({
      error: () => {
        this._errorMessage.set("Error para registrar usuario inesperado");
      }
    }));
  }

  saveOrUpdateUser(user: User): void {
    this._loadingRegisterUser.set(true);
    iif(() => !!user?.id, this.updateDataUser(user), this.registerUser(user))
      .pipe(tap({
        next: value => {
          this._loadingRegisterUser.set(false);
        }, error: () => this._loadingRegisterUser.set(false)
      })).subscribe()
  }


  get loadingRequest(): Signal<boolean> {
    return this._loadingRequest;
  }

  get error(): Signal<string> {
    return this._error;
  }
}
