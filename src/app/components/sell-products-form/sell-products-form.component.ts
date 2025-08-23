import {Component, signal} from '@angular/core';
import {OrderProductFormComponent} from '../order-product-form/order-product-form.component';
import {InventoryProduct} from '../../models/product.model';
import {OrderRequestData} from '../../models/order-product.model';
import {OrderProductController} from '../../controllers/order-product.controller';
import {tap} from 'rxjs';

@Component({
  selector: 'app-order-form',
  imports: [
    OrderProductFormComponent

  ],
  templateUrl: './sell-products-form.component.html',
  standalone: true,
  styleUrl: './sell-products-form.component.css'
})
export class SellProductsFormComponent {

  productos: InventoryProduct[] = [
    {
      id: 1, name: 'Paracetamol', price: 10, code: "",
      stock: 10,
      purchaseDate: new Date('2025-08-01')
    },
    {
      id: 2, name: 'Ibuprofeno', price: 12, code: "",
      stock: 20,
      purchaseDate: new Date('2025-08-01')
    },
    {
      id: 3, name: 'Amoxicilina', price: 20, code: "",
      stock: 1,
      purchaseDate: new Date('2025-08-01')
    },
    {
      id: 4, name: 'Omeprazol', price: 15, code: "",
      stock: 4,
      purchaseDate: new Date('2025-08-01')
    }
  ];

  savingOrder =signal<boolean>(false);

  constructor(private orderProductController: OrderProductController) {}

  sellProduct(data: OrderRequestData) {
    this.savingOrder.set(true);
    this.orderProductController.sellProducts(data).pipe(tap({
      next: (value) => this.savingOrder.set(value),
      error: () => this.savingOrder.set(false)
    })).subscribe();
  }
}
