
export interface OrderProductForm {
  productId: number;
  quantity: number;
}

export interface OrderProduct extends OrderProductForm {
  unitPrice: number;
}

export interface OrderRequestData {
  orderItems: OrderProduct[],
  total: number,
  date: Date,
  observations: string
}
