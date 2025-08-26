import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {INVENTORY_URL} from '../constants/url.constants';
import {InventoryModel} from '../models/inventory.model';

@Injectable({ providedIn: "root"})
export class InventoryService {
  constructor(private http: HttpClient) {}

  verifyProductInInventory(productId: number, quantityInStock: number): Observable<boolean> {
    return this.http.get<boolean>(`${INVENTORY_URL}/${productId}/${quantityInStock}`)
                    .pipe(map(value => value));
  }

  getAllProductsInventory(): Observable<InventoryModel[]> {
    return this.http.get<InventoryModel[]>(INVENTORY_URL);
  }
}
