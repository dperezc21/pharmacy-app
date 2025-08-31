import {Injectable, signal, WritableSignal} from '@angular/core';
import {InventoryService} from '../services/inventory.service';
import {ProductController} from './product.controller';
import {InventoryModel} from '../models/inventory.model';
import {map, Observable, switchMap, tap} from 'rxjs';
import {InventoryProduct, Product} from '../models/product.model';

@Injectable({ providedIn: "root"})
export class InventoryController {

  private inventories: WritableSignal<InventoryModel[]> = signal([]);

  constructor(private inventoryService: InventoryService, private productController: ProductController) {}

  getAllInventories(): Observable<InventoryModel[]> {
    return this.inventoryService.getAllProductsInventory().pipe(
      switchMap(inventories => this.productController.getAllProducts().pipe(map(products => {
        return inventories.map(value => {
          const findProduct: Product = products.find(value1 => value1.id === value.productId) as Product;
          return {...value, product: findProduct} as InventoryModel;
        });
      }))), tap(value => this.setInventoryList(value))
    );
  }

  setInventoryList(inventories: InventoryModel[]): void {
    this.inventories.set(inventories);
  }

  inventoryListGot() {
    return this.inventories;
  }

  mapToInventoryProduct(product: Product, inventory: InventoryModel): InventoryProduct {
    return {
      name: product?.name,
      price: product?.packageSalePrice,
      id: inventory?.inventoryId ?? 0,
      stock: inventory?.quantity,
      code: product?.code,
      purchaseDate: inventory?.date }
  }
}
