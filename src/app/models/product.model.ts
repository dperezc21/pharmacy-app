
export interface Product {
  id?: number;
  code: string;
  name: string;
  price: number;
  description: string;
  category: string;
  productWeight: number;
  laboratory: string;
  iva: number;
  salePrice: number;
}

export interface InventoryProduct {
  id?: number;
  code: string;
  name: string;
  stock: number;
  purchaseDate: Date;
  price: number;
  quantity?: number;
}
