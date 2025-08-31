import {Category, Laboratory} from './ApplicationValue';

export interface Product {
  id?: number;
  code: string;
  name: string;
  packageSalePrice: number;
  description: string;
  category: Category;
  laboratory: Laboratory;
  presentation: string;
  salePrice: number;
  isPackage?: boolean;
}

export interface InventoryProduct {
  id?: number;
  code: string;
  name: string;
  stock: number;
  purchaseDate: Date;
  price: number;
}
