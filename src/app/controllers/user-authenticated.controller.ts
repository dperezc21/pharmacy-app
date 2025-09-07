import {computed, Injectable, Signal, signal} from '@angular/core';
import {User} from '../models/user.models';

@Injectable({ providedIn: "root" })
export class UserAuthenticatedController {
  private _user = signal<User | null>(null);

  private _userAuthenticated: Signal<User | null> = computed(() => this._user());

  get userAuthenticated(): Signal<User | null> {
    return this._userAuthenticated;
  }

  set user(value: User | null) {
    this._user.set(value);
  }

  userIsAdmin(): boolean {
    return this.userAuthenticated()?.role === "admin";
  }
}
