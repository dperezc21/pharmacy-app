
export interface OrderProductForm {
  productId: number;
  quantity: number;
}

export interface OrderProduct extends OrderProductForm{
  totalPrice: number;
}

export interface OrderRequestData {
  products: OrderProduct[],
  total: number,
  date: Date,
  observations: string
}
