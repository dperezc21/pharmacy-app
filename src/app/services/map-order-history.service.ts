import {Injectable} from '@angular/core';
import {OrderHistory, OrderItemHistory} from '../models/order-product.model';

@Injectable({ providedIn: "root"})
export class MapOrderHistoryService {

  static mapOrderHistory(orderItemsHistory: OrderItemHistory[]): OrderHistory[] {
    const orderHistories: OrderHistory[] = [];
    orderItemsHistory.forEach(orderItem => {
      const orderItemDate: string = this.formatDate(orderItem.orderDate);
      const existWithDate: number = orderHistories.findIndex((value1: OrderHistory) => value1.date === orderItemDate) as number;
      if(existWithDate !== -1) {
        const orderItems: OrderItemHistory[] = [...orderHistories[existWithDate].orderItems, orderItem];
        const total: number = orderHistories[existWithDate].total + orderItem.subTotal;
        orderHistories[existWithDate] = {...orderHistories[existWithDate], orderItems, total, date: orderItemDate };
      } else {
        const orderItems: OrderItemHistory[] = [...[], orderItem];
        const total: number = orderItem.subTotal;
        orderHistories.push({orderItems, total, date: orderItemDate })
      }
    });
    return this.sortOrdersByDate(orderHistories);
  }

  private static formatDate(date: Date): string {
    return new Date(date).toDateString();
  }

  private static sortOrdersByDate(orderHistories: OrderHistory[]): OrderHistory[] {
    return orderHistories.sort((a: OrderHistory, b: OrderHistory) => new Date(b.date).getDay() - new Date(a.date).getTime());
  }

}
