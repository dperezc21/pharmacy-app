import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {UserController} from '../../../controllers/user.controller';
import {UserTableComponent} from '../user-table/user-table.component';
import {MatDialog} from '@angular/material/dialog';
import {UserFormComponent} from '../user-form/user-form.component';
import {User} from '../../../models/user.models';
import {ConfirmMessageData} from '../../../models/confirm-message-data';
import {ConfirmMessageComponent} from '../../confirm-message/confirm-message.component';
import {EMPTY, switchMap} from 'rxjs';

@Component({
  selector: 'app-user-main',
  imports: [
    UserTableComponent,
    UserFormComponent
  ],
  templateUrl: './user-main.component.html',
  standalone: true,
  styleUrl: './user-main.component.css'
})
export class UserMainComponent implements OnInit, OnDestroy {

  dialog = inject(MatDialog);
  addUserForm!: boolean;
  userToUpdate!: User | null;

  constructor(protected userController: UserController) {}

  showAddUserForm() : void {
    this.addUserForm = !this.addUserForm;
  }

  openDeleteUser(user: User) {
    const description = `¿Esta seguro que desea eliminar al usuario ${user.userName}?`;
    const infoData: ConfirmMessageData = { type: 'info', title: "Delete Usuario", description };
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      width: '420px',
      data: infoData,
    });
    dialogRef.afterClosed().pipe(switchMap(value => {
      return value ? this.userController.deleteProduct(user.id as number): EMPTY;
    })).subscribe();
  }

  userToEdit(user: User) {
    this.userToUpdate = user;
    this.addUserForm = !this.addUserForm;
  }

  goBackToList(user: User | null) {
    if(user?.id) this.userController.addNewUserToList(user);
    this.addUserForm = !this.addUserForm;
    this.userToUpdate = null;
  }

  ngOnInit(): void {
    this.userController.getAllUsers();
  }

  ngOnDestroy(): void {
    this.userController.destroySubscriptions();
  }
}
