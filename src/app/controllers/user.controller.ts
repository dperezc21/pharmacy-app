import {computed, Injectable, Signal, signal} from '@angular/core';
import {AuthUserService} from '../services/auth-user.service';
import {User} from '../models/user.models';
import {DestroySubject} from '../services/destroy-subject.service';
import {map, Observable, takeUntil, tap} from 'rxjs';
import {SnackBarService} from '../services/snack-bar.service';

@Injectable({ providedIn: "root" })
export class UserController extends DestroySubject {
  private _userList = signal<User[]>([]);

  constructor(private userService: AuthUserService,
              private snackbarService: SnackBarService) {
    super();}

  private readonly _users = computed(() => this._userList());

  getAllUsers(): void {
    this.userService.getAllUsers().pipe(takeUntil(this.destroy$),
      map(users => users.map(value => {return {...value, role: value.role.toLowerCase()}})),
      tap(value => {
      if(value?.length) this._userList.set(value);
    })).subscribe();
  }

  get users(): Signal<User[]> {
    return this._users;
  }

  deleteProduct(productId: number): Observable<boolean> {
    return this.userService.deleteUser(productId)
      .pipe(tap({
        next: value => {
          if (value) {
            this.removeUserOfList(productId);
            this.snackbarService.showMessage("El Usuario fue Eliminado");
          }
        }
      }));
  }

  private removeUserOfList(userId: number) {
    const usersFiltered: User[] = this._userList().filter(value => value.id !== userId);
    this._userList.set(usersFiltered);
  }

  addNewUserToList(user: User) {
    this._userList.set([...this._userList(), user]);
  }
}
