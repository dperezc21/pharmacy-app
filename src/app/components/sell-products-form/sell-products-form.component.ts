import {Component, OnInit, signal} from '@angular/core';
import {OrderProductFormComponent} from '../order-product-form/order-product-form.component';
import {Product} from '../../models/product.model';
import {OrderRequestData} from '../../models/order-product.model';
import {OrderProductController} from '../../controllers/order-product.controller';
import {tap} from 'rxjs';
import {ProductController} from '../../controllers/product.controller';

@Component({
  selector: 'app-order-form',
  imports: [
    OrderProductFormComponent

  ],
  templateUrl: './sell-products-form.component.html',
  standalone: true,
  styleUrl: './sell-products-form.component.css'
})
export class SellProductsFormComponent implements OnInit {

  products!: Product[];

  savingOrder =signal<boolean>(false);

  constructor(private orderProductController: OrderProductController,
              private productController: ProductController) {}

  sellProduct(data: OrderRequestData) {
    this.savingOrder.set(true);
    this.orderProductController.sellProducts(data).pipe(tap({
      next: (value) => this.savingOrder.set(value),
      error: () => this.savingOrder.set(false)
    })).subscribe();
  }

  ngOnInit(): void {
    this.products = this.productController.productsGot()().map(value => {
      return {...value, price: value.salePrice }
    });
  }
}
