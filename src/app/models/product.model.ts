
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
}

// product.model.ts
export interface InventoryProduct {
  code: string;
  name: string;
  stock: number;
  purchaseDate: Date;
}
