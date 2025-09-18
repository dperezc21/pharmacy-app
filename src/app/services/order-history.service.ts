import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ORDERS_HISTORY_URL} from '../constants/url.constants';
import {OrderItemHistory} from '../models/order-product.model';
import {HttpHeaderTokenBearer} from './HttpHeaderTokenBearer';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  constructor(private http: HttpClient, private headerTokenBearer: HttpHeaderTokenBearer) {}

  getPurchases(): Observable<OrderItemHistory[]> {
    return this.http.get<OrderItemHistory[]>( `${ORDERS_HISTORY_URL}/buys`, {
      headers: this.headerTokenBearer.getHeaderBearerToken()
    });
  }

  getSales(): Observable<OrderItemHistory[]> {
    return this.http.get<OrderItemHistory[]>( `${ORDERS_HISTORY_URL}/sales`, {
      headers: this.headerTokenBearer.getHeaderBearerToken()
    });
  }
}
