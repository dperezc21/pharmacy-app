import {Category, Laboratory} from './ApplicationValue';

export interface Product {
  id?: number;
  code: string;
  name: string;
  description: string;
  category: Category;
  laboratory: Laboratory;
  presentation: string;
  priceTypes: ProductPriceType[];
}

export interface InventoryProduct {
  id?: number;
  code: string;
  name: string;
  stock: number;
  purchaseDate: Date;
}

export interface ProductPriceType {
  priceTypeId?: number;
  type?: string,
  label?: string,
  selected?: boolean,
  price?: number,
  quantity?: number;
}
