import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatSuffix} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {LoginController} from '../../../controllers/login.controller';
import {UserAuth} from '../../../models/user.models';
import {MatCardActions, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatLabel,
    MatInput,
    MatButton,
    MatProgressSpinner,
    NgIf,
    MatCardTitle,
    MatCardHeader,
    NgOptimizedImage,
    MatCardActions,
    MatIcon,
    MatIconButton,
    MatSuffix
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  showPasswordText: boolean = false;

  constructor(private fb: FormBuilder,
              private loginController: LoginController) {}

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loginController.loginAuth(this.loginForm.value as UserAuth);
  }

  isSubmitting(): boolean {
    return this.loginController.loadingRequest();
  }

  changeTypePassword() {
    this.showPasswordText = !this.showPasswordText;
  }

  ngOnInit(): void {
    this.loginForm  = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.loginController.destroySubscriptions();
  }
}
