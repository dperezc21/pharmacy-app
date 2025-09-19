import {computed, Injectable, Signal, signal} from '@angular/core';
import {User} from '../models/user.models';
import {AuthUserService} from '../services/auth-user.service';
import {Observable, tap} from 'rxjs';

@Injectable({ providedIn: "root" })
export class UserAuthenticatedController {
  private _user = signal<User | null>(null);
  private _userToken = signal<string>("");

  constructor(private authUserService: AuthUserService) {}

  private _userAuthenticated: Signal<User | null> = computed(() => this._user());
  private _userTokenGot: Signal<string> = computed(() => this._userToken());

  get userAuthenticated(): Signal<User | null> {
    return this._userAuthenticated;
  }

  set user(value: User | null) {
    if(value?.id) this._userToken.set(value?.token);
    this._user.set(value);
  }

  userIsAdmin(): boolean {
    return this.userAuthenticated()?.role === "admin";
  }

  get userTokenGot(): Signal<string> {
    return this._userTokenGot;
  }

  resetUserToken(): void {
    this._userToken.set("");
  }

  verifyTokenValid(): Observable<boolean> {
    return this.authUserService.verifyToken().pipe(tap({
      error: () => this._userToken.set("")
    }));
  }
}
