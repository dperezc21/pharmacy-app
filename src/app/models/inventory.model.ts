import {Product} from './product.model';


export interface InventoryModel {
  inventoryId: number;
  quantity: number;
  product?: Product;
  productId: number;
  date: Date;
}
