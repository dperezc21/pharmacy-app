import {computed, Injectable, Signal, signal} from '@angular/core';
import {User} from '../models/user.models';

@Injectable({ providedIn: "root" })
export class UserAuthenticatedController {
  private _user = signal<User | null>(null);
  private _userToken = signal<string>("");

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
}
