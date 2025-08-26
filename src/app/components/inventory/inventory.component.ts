import {Component, OnInit, signal} from '@angular/core';
import {NgIf} from '@angular/common';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {InventoryProduct, Product} from '../../models/product.model';
import {InventoryListComponent} from '../inventory-list/inventory-list.component';
import {MatButton} from '@angular/material/button';
import {OrderProductFormComponent} from '../order-product-form/order-product-form.component';
import {OrderProduct, OrderRequestData} from '../../models/order-product.model';
import {tap} from 'rxjs';
import {OrderProductController} from '../../controllers/order-product.controller';
import {ProductController} from '../../controllers/product.controller';
import {InventoryController} from '../../controllers/Inventory.controller';
import {InventoryModel} from '../../models/inventory.model';

@Component({
  selector: 'app-inventory',
  imports: [
    MatLabel,
    MatFormField,
    InventoryListComponent,
    MatButton,
    FormsModule,
    MatInput,
    NgIf,
    OrderProductFormComponent
  ],
  templateUrl: './inventory.component.html',
  standalone: true,
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
  products: Product[] = [];
  productsInventory!: InventoryProduct[];
  filteredProducts: InventoryProduct[] = [];
  filterCode: string = '';
  makeInventory =signal<boolean>(false);
  savingOrder =signal<boolean>(false);
  inventory = signal<InventoryModel[]>([]);

  constructor(private orderProductController: OrderProductController,
              private productController: ProductController,
              private inventoryController: InventoryController) {
  }

  ngOnInit(): void {
    this.products = this.productController.productsGot()();
    this.inventory = this.inventoryController.inventoryListGot();
    this.productsInventory = this.inventory().map(value => {
      const product: Product = value.product as Product;
      return this.inventoryController.mapToInventoryProduct(product, value)}) as InventoryProduct[];
    this.filteredProducts = this.productsInventory;
  }

  applyCodeFilter() {
    this.filteredProducts = this.productsInventory.filter(value => {
      return value.code.toLowerCase().includes(this.filterCode.toLowerCase());
    })
  }

  purchaseOrder() {
    this.makeInventory.update(value => !value);
  }

  buysProducts(data: OrderRequestData) {
    this.savingOrder.set(true);
    this.orderProductController.buysProducts(data).pipe(tap({
      next: () => {
        this.savingOrder.update(value1 => !value1)
        this.updateProductsInventory(data);
      },
      error: () => this.savingOrder.update(value => !value)
    })).subscribe();
  }

  updateProductsInventory({date, orderItems }: OrderRequestData) {
    const data: InventoryProduct[] = orderItems.map((orderProduct: OrderProduct) => {
      const findProduct: Product = this.products.find(product => product.id === orderProduct.productId) as Product;
      const inventoryModel: InventoryModel = {inventoryId: 0, date, quantity: orderProduct.quantity} as InventoryModel;
      return this.inventoryController.mapToInventoryProduct(findProduct, inventoryModel)
    });
    this.filteredProducts = this.productsInventory.map(value => {
      const inventoryProduct: InventoryProduct = data.find(value1 => value1.code == value.code) as InventoryProduct;
      return inventoryProduct?.code ? { ...value, stock: (value.stock + inventoryProduct.stock) } : value;
    });
  }

}
