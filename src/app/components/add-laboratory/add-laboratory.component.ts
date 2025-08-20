import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatFormField} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatDialogRef} from '@angular/material/dialog';
import {Laboratory} from '../../models/ApplicationValue';

@Component({
  selector: 'app-add-laboratory',
  templateUrl: './add-laboratory.component.html',
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    MatInput
  ],
  standalone: true,
  styleUrls: ['./add-laboratory.component.css']
})
export class AddLaboratoryComponent implements OnInit {
  labForm!: FormGroup;
  dialogRef: MatDialogRef<AddLaboratoryComponent, Laboratory> = inject((MatDialogRef))

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.labForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  saveLab() {
    if (this.labForm.valid) {
      console.log('Laboratorio guardado :', this.labForm.value);
      this.dialogRef.close(this.labForm.value as Laboratory);
      this.labForm.reset();
    } else {
      this.labForm.markAllAsTouched();
    }
  }
}
