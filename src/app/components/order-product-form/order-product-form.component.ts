import {Component, Input, input, OnChanges, OnInit, output, signal, SimpleChanges, ViewChild} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {tap} from 'rxjs';
import {MatError, MatFormField, MatSuffix} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {Product, ProductPriceType} from '../../models/product.model';
import {OrderProduct, OrderRequestData} from '../../models/order-product.model';
import {OrderProductController} from '../../controllers/order-product.controller';
import {MatTooltip} from '@angular/material/tooltip';
import {InventoryModel} from '../../models/inventory.model';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatIcon} from '@angular/material/icon';
import {PRODUCT_PRICE_TYPE} from '../../constants/product.constants';

@Component({
  selector: 'app-order-product-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    NgForOf,
    FormsModule,
    MatButton,
    MatLabel,
    MatTooltip,
    MatError,
    MatRadioGroup,
    MatRadioButton,
    NgIf,
    MatIcon,
    MatIconButton,
    MatSuffix
  ],
  templateUrl: './order-product-form.component.html',
  standalone: true,
  styleUrl: './order-product-form.component.css'
})
export class OrderProductFormComponent implements OnInit, OnChanges {
  @ViewChild('selectProduct') viewSelectProduct!: MatSelect;
  products = input<Product[]>([]);
  inventoryProduct = input<InventoryModel[]>([]);
  sendOrderData = output<OrderRequestData>();
  goBack = output();
  orderForm!: FormGroup;
  enableButtonCancel = input<boolean>(false);
  @Input() savingOrderProduct!: boolean;
  productsFiltered = signal<Product[]>([]);
  totalPrice: number = 0;
  selectedPriceTypeControl = new FormControl(null);

  constructor(private fb: FormBuilder, private orderProduct: OrderProductController) {}

  get productsFormArray() {
    return this.orderForm.get('products') as FormArray;
  }

  buildItemProduct({ productId, unitPrice, quantity, name, subTotal, subQuantity }: OrderProduct): FormGroup {
    return this.fb.group({
      productId: [productId, Validators.required],
      quantity: [quantity, [Validators.required, Validators.min(1)]],
      subTotal: [subTotal, Validators.required],
      unitPrice: [unitPrice, Validators.required],
      name: [name, Validators.required],
      subQuantity: [subQuantity]
    });
  }

  removeProduct(index: number) {
    const productToRemove: OrderProduct = this.productsFormArray.at(index).value as OrderProduct;
    if(!productToRemove?.productId) return;
    this.totalPrice -= productToRemove.subTotal;
    this.productsFormArray.removeAt(index);
  }

  sendRequest() {
    this.savingOrderProduct = true;
    if (this.orderForm.valid) {
      const formData = this.orderForm.value;
      const orderProducts: OrderProduct[] = formData.products.map((productForm: OrderProduct) => {
        const {name, ...orderProduct}: OrderProduct = productForm;
        orderProduct.quantity = orderProduct.subQuantity;
        return orderProduct;
      }) as OrderProduct[];

      this.sendOrderData.emit({
        orderItems: orderProducts,
        total: this.totalPrice,
        date: formData.date,
        observations: formData?.observations ?? ''
      });
    }
  }

  minLengthArray(min: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control instanceof FormArray && control.length < min) {
        return { minLengthArray: { requiredLength: min, actualLength: control.length } };
      }
      return null;
    };
  }

  productQuantityValid()  {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const productCode: string = this.orderForm.get('selectProduct')?.value as string;
      const inventoryModel: InventoryModel = this.inventoryProduct().find(value => value.product?.code == productCode) as InventoryModel;
      if(this.enableButtonCancel()) return null;
      if(inventoryModel?.quantity < control?.value) {
        return {
          stockExceeded: {
            currentStock: inventoryModel.quantity,
            stockSelected: control?.value
          }
        };
      }
      return null;
    };
  }

  get priceTypesFormArray(): FormArray {
    return this.orderForm.get('priceTypes') as FormArray;
  }

  mapPriceTypesFormArray(priceTypes: ProductPriceType[]) {
    return this.fb.array(priceTypes.map((value: ProductPriceType) => {
      return this.fb.group({...value});
    }));
  }

  addProductToList() {
    const productCode: string = this.orderForm.get('selectProduct')?.value as string;
    const findProduct: Product = this.products().find(value => value.code === productCode) as Product;
    let quantity: number = this.orderForm.get('quantity')?.value as number;
    const subTotal: number = this.priceControlForSelected().value * quantity;

    const quantityUnit: number = this.typeControlForSelected().value == 'unit' ? quantity
                                : quantity * this.quantityControlForSelected().value as number;
    const unitPrice: number = this.priceControlForSelected().value;
    const productToAdd = this.buildItemProduct({
      name: findProduct.name,
      productId: findProduct.id as number,
      quantity: quantity,
      subTotal,
      unitPrice,
      subQuantity: quantityUnit
    });
    this.productsFormArray.push(productToAdd);
    this.totalPrice += subTotal;
    this.resetValuesAfterAddProduct();
  }

  resetValuesAfterAddProduct(): void {
    this.orderForm.get('selectProduct')?.reset();
    this.orderForm.get('searchProduct')?.reset();
    this.resetQuantityFormControl();
    this.productsFiltered.set(this.products());
  }

  private resetQuantityFormControl(): void {
    this.orderForm.get('quantity')?.setValue(1);
    this.orderForm.controls['quantity'].clearValidators();
  }

  private addQuantityControlRequired() {
    this.orderForm.controls['quantity'].addValidators(
      [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), this.productQuantityValid()]);
    this.orderForm.controls['quantity'].updateValueAndValidity();
  }

  cleanDataFilter() {
    this.orderForm.get('searchProduct')?.setValue('');
    this.productsFiltered.set(this.products());
  }

  findProductPriceTypes(code: string): ProductPriceType[] {
    return this.products().find(value => value.code == code)?.priceTypes as ProductPriceType[];
  }

  priceControlForSelected(): FormControl {
    return this.getControlForSelected('price');
  }

  quantityControlForSelected(): FormControl {
    return this.getControlForSelected('quantity');
  }

  typeControlForSelected(): FormControl {
    return this.getControlForSelected('type');
  }

  getControlForSelected(formControlName: string): FormControl {
    const index = this.selectedPriceTypeControl.value;
    if (index !== null && this.priceTypesFormArray.at(index)) {
      return this.priceTypesFormArray.at(index).get(formControlName) as FormControl;
    }
    return new FormControl({value: null, disabled: true});
  }


  ngOnInit(): void {
    this.productsFiltered.set(this.products());
    this.orderForm = this.fb.group({
      date: new FormControl(new Date(), Validators.required),
      observations: new FormControl(''),
      products: this.fb.array([], this.minLengthArray(1)),
      selectProduct: new FormControl(''),
      searchProduct: new FormControl(''),
      quantity: new FormControl(1),
      priceTypes: this.mapPriceTypesFormArray(PRODUCT_PRICE_TYPE)
    });

    this.orderForm.get('searchProduct')?.valueChanges.pipe(tap(value => {
      if(!value) return;
      const productList: Product[] = this.products().filter(value1 => value1.code === value
        || value1.name.toLowerCase().includes(value.toLowerCase()));
      if(productList?.length) {
        this.productsFiltered.update(() => productList);
        this.viewSelectProduct.open();
      }
    })).subscribe();

    this.orderForm.get('selectProduct')?.valueChanges.pipe(tap(value => {
      if(value) {
        this.addQuantityControlRequired();
        const price = this.findProductPriceTypes(value);
        this.orderForm?.get('priceTypes')?.patchValue(price);
      }
    })).subscribe();

  }

  ngOnChanges(changes: SimpleChanges): void {
    const savingOrderProduct: boolean = changes["savingOrderProduct"]?.currentValue;
    const orderIsSaved: boolean = this.orderProduct.orderIsDone()();
    if(!savingOrderProduct && this.enableButtonCancel() && orderIsSaved) this.goBack.emit();
    else if(!savingOrderProduct && orderIsSaved) {
      this.resetValuesAfterAddProduct();
      this.productsFormArray.clear();
      this.totalPrice = 0;
    }
    if(orderIsSaved) this.orderProduct.changeOrderIsDone();
  }
}
