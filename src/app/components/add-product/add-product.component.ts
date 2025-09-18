import {Component, inject, Input, input, OnDestroy, OnInit, output, signal} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatCardActions} from '@angular/material/card';
import {Product, ProductPriceType} from '../../models/product.model';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {AddCategoryComponent} from '../add-category/add-category.component';
import {AddLaboratoryComponent} from '../add-laboratory/add-laboratory.component';
import {LaboratoryController} from '../../controllers/laboratory.controller';
import {CategoryController} from '../../controllers/category.controller';
import {Category, Laboratory} from '../../models/ApplicationValue';
import {iif, of, switchMap, tap} from 'rxjs';
import {MatCheckbox} from '@angular/material/checkbox';
import {NgForOf, NgIf} from '@angular/common';
import {PRODUCT_PRICE_TYPE} from '../../constants/product.constants';

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
    MatCheckbox,
    NgForOf,
    NgIf
  ],
  templateUrl: './add-product.component.html',
  standalone: true,
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit, OnDestroy {
  @Input() isSaving!: boolean;
  productForm!: FormGroup;

  laboratories = signal<Laboratory[]>([]);
  categories = signal<Category[]>([]);

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
    const productTypePrices: ProductPriceType[] = (this.productToEdit()?.id && this.productToEdit()?.priceTypes.length
                              ? this.productToEdit()?.priceTypes : PRODUCT_PRICE_TYPE) as ProductPriceType[];
    this.productForm = this.fb.group({
      code: [this.productToEdit()?.code ?? '', Validators.required],
      name: new FormControl( this.productToEdit()?.name ?? '', [Validators.required]),
      laboratory: new FormControl(this.productToEdit()?.laboratory ?? '', [Validators.required]),
      category: new FormControl( this.productToEdit()?.category ?? '', [Validators.required]),
      description: new FormControl( this.productToEdit()?.description ?? ''),
      presentation: new FormControl(this.productToEdit()?.presentation ?? '', [Validators.required, Validators.minLength(0), Validators.maxLength(100)]),
      priceTypes: this.mapPriceTypesFormArray(productTypePrices)
    });
  }

  get priceTypesFormArray(): FormArray {
    return this.productForm.get('priceTypes') as FormArray;
  }

  mapPriceTypesFormArray(priceTypes: ProductPriceType[]) {
    return this.fb.array(priceTypes.map((value: ProductPriceType) => {
        return this.fb.group({...value});
      }));
  }

  compareCategories(o1: Category, o2: Category): boolean {
    return o1.categoryId === o2.categoryId;
  }

  compareLaboratories(o1: Laboratory, o2: Laboratory): boolean {
    return o1.laboratoryId === o2.laboratoryId;
  }

  mapPriceTypesSelected(priceTypes: ProductPriceType[]): ProductPriceType[] {
    return priceTypes.map(value => {
      if(!value.selected) {
        value.price = 0;
        value.quantity = 0;
      }
      return value;
    })
  }

  saveProduct() {
    this.isSaving = true;
    if (this.productForm.valid) {
      const productToSave: Product = this.productForm.value;
      if(this.productToEdit()?.id) productToSave.id = this.productToEdit()?.id;
      productToSave.priceTypes = this.mapPriceTypesSelected(productToSave.priceTypes);
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
