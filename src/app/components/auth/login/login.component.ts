import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {LoginController} from '../../../controllers/login.controller';
import {UserAuth} from '../../../models/user.models';
import {MatCardActions, MatCardHeader, MatCardTitle} from '@angular/material/card';

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
    MatCardActions
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private loginController: LoginController) {}

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loginController.loginAuth(this.loginForm.value as UserAuth);
  }

  isSubmitting(): boolean {
    return this.loginController.loadingRequest();
  }

  ngOnInit(): void {
    this.loginForm  = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.loginController.destroySubscriptions();
  }
}
