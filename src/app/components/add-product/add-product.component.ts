import {Component, input, OnInit, output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatCardActions} from '@angular/material/card';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-add-product',
  imports: [
    MatFormField,
    MatLabel,
    MatOption,
    NgForOf,
    MatSelect,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatCardActions
  ],
  templateUrl: './add-product.component.html',
  standalone: true,
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  laboratories: string[] = ['Bayer', 'Pfizer', 'Novartis', 'Roche'];
  categories: string[] = ['Analgésico', 'Antibiótico', 'Antigripal', 'Vitaminas'];
  goBack = output<void>();
  productSaved = input<boolean>(false);
  emitProductToSave = output<Product>();


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      laboratory: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      productWeight: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      iva: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      price: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    });
  }

  guardarProducto() {

    if (this.productForm.valid) {
      const productToSave: Product = this.productForm.value;
      this.emitProductToSave.emit(productToSave);
      console.log('Producto guardado:', productToSave);
      // Aquí puedes llamar a un servicio para guardar en el backend
      this.productForm.reset();
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
