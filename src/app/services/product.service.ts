import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Product} from '../models/product.model';
import {PRODUCT_URL} from '../constants/url.constants';
import {HttpHeaderTokenBearer} from './HttpHeaderTokenBearer';


@Injectable({ providedIn: "root"})
export class ProductService {
  constructor(private http: HttpClient, private headerTokenBearer: HttpHeaderTokenBearer) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCT_URL, {
      headers: this.headerTokenBearer.getHeaderBearerToken()
    }).pipe(map((value: Product[]) => value));
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(PRODUCT_URL, product, {
      headers: this.headerTokenBearer.getHeaderBearerToken()
    }).pipe(map(value => value));
  }

  editProduct(product: Product) {
    return this.http.put<Product>(`${PRODUCT_URL}/${product.id}`, product, {
      headers: this.headerTokenBearer.getHeaderBearerToken()
    }).pipe(map(value => value));
  }

  deleteProduct(productId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${PRODUCT_URL}/${productId}`, {
      headers: this.headerTokenBearer.getHeaderBearerToken()
    }).pipe(map((value: boolean) => value));
  }
}
