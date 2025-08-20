import {Component, inject, input, OnInit, output, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatCardActions} from '@angular/material/card';
import {Product} from '../../models/product.model';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {AddCategoryComponent} from '../add-category/add-category.component';
import {AddLaboratoryComponent} from '../add-laboratory/add-laboratory.component';
import {LaboratoryController} from '../../controllers/laboratory.controller';
import {CategoryController} from '../../controllers/category.controller';
import {Category, Laboratory} from '../../models/ApplicationValue';
import {iif, of, switchMap, tap} from 'rxjs';

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
    MatCardActions,
    MatIcon
  ],
  templateUrl: './add-product.component.html',
  standalone: true,
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  laboratories = signal<Laboratory[]>([]); //['Bayer', 'Pfizer', 'Novartis', 'Roche'];
  categories = signal<Category[]>([]); //['Analgésico', 'Antibiótico', 'Antigripal', 'Vitaminas'];
  goBack = output<void>();
  productSaved = input<boolean>(false);
  emitProductToSave = output<Product>();
  readonly dialog = inject(MatDialog);

  constructor(private fb: FormBuilder,
              private laboratoryController: LaboratoryController,
              private categoryController: CategoryController) {}

  ngOnInit(): void {
    this.laboratories = this.laboratoryController.laboratoriesGot();
    this.categories = this.categoryController.categoriesGot();
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

  saveProduct() {

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

  dialogAddLaboratory() {
    this.dialog.open(AddLaboratoryComponent, {
      width: "400px",
      height: "400px"
    }).beforeClosed()
      .pipe(switchMap(value => {
        return iif(() => !!Object.values(value)?.length, this.laboratoryController.addLaboratory(value), of(null));
      }), tap(value => {
        if(value?.laboratoryId) this.productForm.get('laboratory')?.setValue(value);
      }))
      .subscribe();
  }

  dialogAddCategory() {
    this.dialog.open(AddCategoryComponent,{
      width: "400px",
      height: "400px"
    }).beforeClosed()
      .pipe(switchMap(value => {
        return iif(() => !!Object.values(value)?.length, this.categoryController.addCategory(value), of(null));
      }), tap(value => {
        if(value?.categoryId) this.productForm.get('category')?.setValue(value);
      }))
      .subscribe();
  }
}
