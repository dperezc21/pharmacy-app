import {Component, OnInit, signal} from '@angular/core';
import {UserFormComponent} from '../user-form/user-form.component';
import {User} from '../../../models/user.models';
import {UserAuthenticatedController} from '../../../controllers/user-authenticated.controller';

@Component({
  selector: 'app-user-account',
  imports: [
    UserFormComponent
  ],
  templateUrl: './user-account.component.html',
  standalone: true,
  styleUrl: './user-account.component.css'
})
export class UserAccountComponent implements OnInit {

  user = signal<User | null>(null);

  constructor(private userAuthenticatedController: UserAuthenticatedController) {}

  ngOnInit(): void {
    this.user.set(this.userAuthenticatedController.userAuthenticated());
  }

}
