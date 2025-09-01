import {Component, inject, Input, input, OnDestroy, OnInit, output, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
import {NgIf} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';

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
    MatIcon,
    MatCheckbox
  ],
  templateUrl: './add-product.component.html',
  standalone: true,
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit, OnDestroy {
  @Input() isSaving!: boolean;
  productForm!: FormGroup;

  laboratories = signal<Laboratory[]>([]); //['Bayer', 'Pfizer', 'Novartis', 'Roche'];
  categories = signal<Category[]>([]); //['Analgésico', 'Antibiótico', 'Antigripal', 'Vitaminas'];

  goBack = output<void>();
  productSaved = input<boolean>(true);
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
      name: new FormControl( this.productToEdit()?.name ?? '', [Validators.required]),
      laboratory: new FormControl(this.productToEdit()?.laboratory ?? '', [Validators.required]),
      category: new FormControl( this.productToEdit()?.category ?? '', [Validators.required]),
      description: new FormControl( this.productToEdit()?.description ?? ''),
      presentation: new FormControl(this.productToEdit()?.presentation ?? '', [Validators.required, Validators.minLength(0), Validators.maxLength(100)]),
      packageSalePrice: new FormControl( this.productToEdit()?.packageSalePrice ?? 0, [Validators.min(0)]),
      salePrice: new FormControl( this.productToEdit()?.salePrice ?? '', [Validators.required, Validators.min(0)]),
      isPackage: new FormControl( this.productToEdit()?.isPackage ?? ''),
      packageUnit: new FormControl( this.productToEdit()?.packageUnit ?? 0, [Validators.min(0)]),
    });
  }

  inputCodeIsValid(): boolean {
    return this.productForm.get('code')?.valid as boolean;
  }

  compareCategories(o1: Category, o2: Category): boolean {
    return o1.categoryId === o2.categoryId;
  }

  compareLaboratories(o1: Laboratory, o2: Laboratory): boolean {
    return o1.laboratoryId === o2.laboratoryId;
  }

  saveProduct() {
    console.log("EDIT", this.productToEdit())
    this.isSaving = true;
    if (this.productForm.valid) {
      const {isPackage, ...productToSave}: Product = this.productForm.value;
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
