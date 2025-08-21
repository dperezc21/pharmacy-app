import {Component, inject, input, OnDestroy, OnInit, output, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
export class AddProductComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;

  laboratories = signal<Laboratory[]>([]); //['Bayer', 'Pfizer', 'Novartis', 'Roche'];
  categories = signal<Category[]>([]); //['Analgésico', 'Antibiótico', 'Antigripal', 'Vitaminas'];
  goBack = output<void>();
  productSaved = input<boolean>(false);
  emitProductToSave = output<Product>();
  readonly dialog = inject(MatDialog);
  productToEdit = input<Product>();

  constructor(private fb: FormBuilder,
              private laboratoryController: LaboratoryController,
              private categoryController: CategoryController) {}

  ngOnInit(): void {
    this.laboratories = this.laboratoryController.laboratoriesGot();
    this.categories = this.categoryController.categoriesGot();

    this.productForm = this.fb.group({
      code: [this.productToEdit()?.code ?? '', Validators.required],
      name: [this.productToEdit()?.name ?? '', Validators.required],
      laboratory: [this.productToEdit()?.laboratory ?? '', Validators.required],
      category: [this.productToEdit()?.category ?? '', Validators.required],
      description: [this.productToEdit()?.description ?? ''],
      productWeight: [this.productToEdit()?.productWeight ?? '', [Validators.required, Validators.pattern(/^\d+(\.\d{1,9})?$/)]],
      iva: [this.productToEdit()?.iva ?? '', [Validators.required, Validators.min(0), Validators.max(100)]],
      price: [this.productToEdit()?.price ?? '', [Validators.required, Validators.min(0)]],
    });
  }

  compareCategories(o1: Category, o2: Category): boolean {
    return o1.categoryId === o2.categoryId;
  }

  compareLaboratories(o1: Laboratory, o2: Laboratory): boolean {
    return o1.laboratoryId === o2.laboratoryId;
  }

  saveProduct() {
    if (this.productForm.valid) {
      const productToSave: Product = this.productForm.value;
      if(this.productToEdit()?.id) productToSave.id = this.productToEdit()?.id;
      this.emitProductToSave.emit(productToSave);
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

  ngOnDestroy(): void {
    this.categoryController.destroySubscriptions();
    this.laboratoryController.destroySubscriptions();
  }
}
