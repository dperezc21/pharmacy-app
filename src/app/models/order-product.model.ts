import {Product} from './product.model';

export interface OrderProduct {
  productId: number;
  name?: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  subQuantity: number;
}

export interface OrderRequestData {
  orderItems: OrderProduct[],
  total: number,
  date: Date,
  observations: string
}

export type DetailsItemType = Omit<OrderProduct, 'productId' | 'name'>;

export interface OrderItemHistory extends DetailsItemType {
  id: number,
  product: Product,
  orderDate: Date;
}
