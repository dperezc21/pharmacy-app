import {Component, Input, input, OnChanges, OnInit, output, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {tap} from 'rxjs';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatSuffix} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {InventoryProduct} from '../../models/product.model';
import {OrderProduct, OrderProductForm, OrderRequestData} from '../../models/order-product.model';
import {OrderProductController} from '../../controllers/order-product.controller';

@Component({
  selector: 'app-order-product-form',
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
    MatIconButton,
    MatIcon,
    NgIf,
    MatInput,
    NgForOf,
    FormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix
  ],
  templateUrl: './order-product-form.component.html',
  standalone: true,
  styleUrl: './order-product-form.component.css'
})
export class OrderProductFormComponent implements OnInit, OnChanges {
  products = input<InventoryProduct[]>([]);
  sendOrderData = output<OrderRequestData>();
  goBack = output();
  orderForm!: FormGroup;
  totalPrice: number = 0;
  enableButtonCancel = input<boolean>(false);
  @Input() saving!: boolean;

  constructor(private fb: FormBuilder, private orderProduct: OrderProductController) {}

  get productsFormArray() {
    return this.orderForm.get('products') as FormArray;
  }

  createItemProduct(): FormGroup {
    return this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  addProduct() {
    this.productsFormArray.push(this.createItemProduct());
  }

  removeProduct(index: number) {
    this.productsFormArray.removeAt(index);
  }

  sendRequest() {
    this.saving = true;
    if (this.orderForm.valid) {
      const formData = this.orderForm.value;
      const orderProducts: OrderProduct[] = formData.products.map((productForm: OrderProductForm) => {
        const inventoryProduct: InventoryProduct = this.products().find((product: InventoryProduct) => product.id === productForm.productId) as InventoryProduct;
        return {
          productId: inventoryProduct?.id,
          quantity: productForm.quantity,
          unitPrice: inventoryProduct ? inventoryProduct.price : 0
        };
      }) as OrderProduct[];

      this.sendOrderData.emit({
        orderItems: orderProducts,
        total: this.totalPrice,
        date: formData.date,
        observations: formData?.observations ?? ''
      });
    }
  }

  productsSelectedTotalPrice(products: OrderProductForm[]): number {
    return products.reduce((previousValue, currentValue) => {
      if(currentValue?.productId) {
        const findProduct = this.products().find((value1: any) => value1.id == currentValue.productId) as InventoryProduct;
        previousValue+=(currentValue.quantity * findProduct.price as number)
      }
      return previousValue;
    }, 0);
  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      date: [new Date(), Validators.required],
      observations: [''],
      products: this.fb.array([
        this.createItemProduct()
      ])
    });
    this.orderForm.get('products')?.valueChanges.pipe(tap(value => {
      const products: OrderProductForm[] = value;
      this.totalPrice = this.productsSelectedTotalPrice(products);
    })).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const saving: boolean = changes["saving"]?.currentValue;
    if(!saving && this.enableButtonCancel() && this.orderProduct.orderIsDone()()) this.goBack.emit();
    else if(!saving && this.orderProduct.orderIsDone()()) this.orderForm?.reset();
  }
}
