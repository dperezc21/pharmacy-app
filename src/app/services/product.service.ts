import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Product} from '../models/product.model';
import {PRODUCT_URL} from '../constants/url.constants';


@Injectable({ providedIn: "root"})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCT_URL).pipe(map((value: Product[]) => value));
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(PRODUCT_URL, product).pipe(map(value => value));
  }

  editProduct(product: Product) {
    return this.http.put<Product>(`${PRODUCT_URL}/${product.id}`, product)
      .pipe(map(value => value));
  }
}
