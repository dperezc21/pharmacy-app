import {Component, input, OnInit} from '@angular/core';
import {User} from '../../../models/user.models';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatHint, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatFormField} from '@angular/material/form-field';
import {NgForOf, NgIf} from '@angular/common';
import {MatButton, MatIconAnchor, MatIconButton} from '@angular/material/button';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatCardHeader} from '@angular/material/card';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatIcon} from '@angular/material/icon';
import {UserRegisterController} from '../../../controllers/user-register.controller';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    NgForOf,
    MatButton,
    NgIf,
    MatHint,
    MatCardHeader,
    MatCheckbox,
    FormsModule,
    MatSuffix,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './user-form.component.html',
  standalone: true,
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  userData = input<User | null>(null);

  userForm!: FormGroup;
  editMode = false;
  showPasswordField = false;

  roles = ['admin', 'user'];
  isTypePassword: boolean = true;

  constructor(private fb: FormBuilder, protected userRegisterController: UserRegisterController) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      fullName: [{ value: '', disabled: true }, Validators.required],
      userName: [{ value: '', disabled: true }, Validators.required],
      role: [{ value: '', disabled: true }, Validators.required],
      password: [{ value: '', disabled: true }, [Validators.minLength(6)]],
    });
    if (this.userData()) this.userForm.patchValue(this.userData() as User);
    else {
      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.toggleEdit();
    }

    console.log(this.userForm)
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    if (this.editMode) this.userForm.enable();
    else this.userForm.disable();
  }

  togglePasswordField(checked: boolean) {
    this.showPasswordField = checked;
    const passwordCtrl = this.userForm.get('password');
    if (this.showPasswordField) {
      passwordCtrl?.enable();
      passwordCtrl?.setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      passwordCtrl?.reset();
      passwordCtrl?.disable();
      passwordCtrl?.clearValidators();
    }
    passwordCtrl?.updateValueAndValidity();
  }

  changeTypePassword() {
    this.isTypePassword = !this.isTypePassword;
  }

  compareRoles(o1: string, o2: string): boolean {
    return o1 === o2;
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue: User = this.userForm.getRawValue() as User;
      if(this.userData()?.id) formValue.id = this.userData()?.id;
      formValue.role = formValue.role.toUpperCase();
      this.userRegisterController.saveOrUpdateUser(formValue)
      // Aquí haces un POST o PUT al backend
    }
  }
}
