import {Product} from './product.model';

export interface OrderProduct {
  productId: number;
  name?: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  totalQuantity: number;
  priceTypeName: string;
}

export interface OrderRequestData {
  orderItems: OrderProduct[],
  date: Date,
}

export type DetailsItemType = Omit<OrderProduct, 'productId' | 'name'>;

export interface OrderItemHistory extends DetailsItemType {
  id: number,
  product: Product,
  orderDate: Date;
}

export interface OrderHistory {
  orderItems: OrderItemHistory[],
  date: string,
  total: number;
}

