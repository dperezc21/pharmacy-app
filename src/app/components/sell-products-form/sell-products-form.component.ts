import {Component, OnInit, signal} from '@angular/core';
import {OrderProductFormComponent} from '../order-product-form/order-product-form.component';
import {Product} from '../../models/product.model';
import {OrderRequestData} from '../../models/order-product.model';
import {OrderProductController} from '../../controllers/order-product.controller';
import {EMPTY, iif, switchMap, tap} from 'rxjs';
import {ProductController} from '../../controllers/product.controller';
import {InventoryController} from '../../controllers/Inventory.controller';
import {InventoryModel} from '../../models/inventory.model';

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
  inventory = signal<InventoryModel[]>([]);
  savingOrder =signal<boolean>(false);

  constructor(private orderProductController: OrderProductController,
              private productController: ProductController,
              private inventoryController: InventoryController) {}

  sellProduct(data: OrderRequestData) {
    this.savingOrder.set(true);
    this.orderProductController.sellProducts(data).pipe(tap({
      next: () => this.savingOrder.update(value => !value),
      error: () => this.savingOrder.update(value => !value)
    }), switchMap((value: boolean) =>
        iif(() => value, this.inventoryController.getAllInventories(), EMPTY)),
      tap(value => { if(value?.length) this.inventory.set(value);}))
      .subscribe();
  }

  ngOnInit(): void {
    this.products = this.productController.productsGot()().map(value => {
      return {...value, price: value.salePrice }
    });
    this.inventory.set(this.inventoryController.inventoryListGot()());
  }
}
