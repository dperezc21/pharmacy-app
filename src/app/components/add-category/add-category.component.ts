import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Category} from '../../models/ApplicationValue';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    MatInput
  ],
  templateUrl: './add-category.component.html',
  standalone: true,
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  dialogRef = inject(MatDialogRef<AddCategoryComponent, Category>);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  saveCategory() {
    if (this.categoryForm.valid) {
      console.log('Categoría guardada:', this.categoryForm.value);
      this.dialogRef.close(this.categoryForm.value);
      this.categoryForm.reset();
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
}
