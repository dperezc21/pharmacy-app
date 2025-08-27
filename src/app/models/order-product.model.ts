
export interface OrderProduct {
  productId: number;
  name?: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
}

export interface OrderRequestData {
  orderItems: OrderProduct[],
  total: number,
  date: Date,
  observations: string
}
