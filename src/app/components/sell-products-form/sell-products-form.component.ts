import {Component} from '@angular/core';
import {OrderProductFormComponent} from '../order-product-form/order-product-form.component';
import {InventoryProduct} from '../../models/product.model';

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

  constructor() {}

  sellProduct(data: any) {
    console.log(data);
  }
}
