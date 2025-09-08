import {AfterViewInit, Component, computed, input, output, Signal, signal, ViewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {ReactiveFormsModule} from "@angular/forms";
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatIcon} from '@angular/material/icon';
import {UserAuthenticatedController} from '../../../controllers/user-authenticated.controller';
import {User} from '../../../models/user.models';
import {IsUserCurrentPipe} from '../../../pipes/is-user-current.pipe';

@Component({
  selector: 'app-user-table',
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    ReactiveFormsModule,
    MatHeaderCellDef,
    MatMenuTrigger,
    IsUserCurrentPipe
  ],
  templateUrl: './user-table.component.html',
  standalone: true,
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  addUser = output();
  editUser = output<User>();
  deleteUser = output<User>();
  users = input<User[]>([]);
  displayedColumns: string[] = ['name', 'userName', 'role', 'buttons'];

  private pageIndex = signal(0);
  private pageSize = signal(5);

  protected itemsPaginated = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.users().slice(start, start + this.pageSize());
  });

  constructor(protected userAuthenticatedController: UserAuthenticatedController) {}

  userAuthenticated(): Signal<User | null> {
    return this.userAuthenticatedController.userAuthenticated as Signal<User | null>;
  }

  changePage($event: PageEvent) {
    this.pageIndex.set($event.pageIndex);
    this.pageSize.set($event.pageSize);
  }

  ngAfterViewInit(): void {
    this.paginator?.page?.subscribe(event => {
      this.pageIndex.set(event.pageIndex);
      this.pageSize.set(event.pageSize);
    });
  }

}
