import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderRequestData} from '../models/order-product.model';
import {map, Observable} from 'rxjs';
import {ORDER_URL} from '../constants/url.constants';
import {HttpHeaderTokenBearer} from './HttpHeaderTokenBearer';

@Injectable({ providedIn: "root"})
export class OrderProductService {
  constructor(private http: HttpClient, private headerTokenBearer: HttpHeaderTokenBearer) {}

  placeOrder(order: OrderRequestData): Observable<boolean> {
    return this.http.put<boolean>(`${ORDER_URL}/buys`, order, {
      headers: this.headerTokenBearer.getHeaderBearerToken()
    })
      .pipe(map(value => value as boolean));
  }

  sellOrderProduct(order: OrderRequestData): Observable<boolean> {
    return this.http.put<boolean>(`${ORDER_URL}/sale`, order, {
      headers: this.headerTokenBearer.getHeaderBearerToken()
    })
      .pipe(map(value => value as boolean));
  }
}
