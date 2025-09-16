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
  packageUnit?: number;
  priceTypes: ProductPriceType[];
}

export interface InventoryProduct {
  id?: number;
  code: string;
  name: string;
  stock: number;
  purchaseDate: Date;
  price: number;
}

export interface ProductPriceType {
  type?: string,
  label?: string,
  selected?: boolean,
  price?: number
}
