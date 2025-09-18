import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {INVENTORY_URL} from '../constants/url.constants';
import {InventoryModel} from '../models/inventory.model';
import {HttpHeaderTokenBearer} from './HttpHeaderTokenBearer';

@Injectable({ providedIn: "root"})
export class InventoryService {
  constructor(private http: HttpClient, private headerTokenBearer: HttpHeaderTokenBearer) {}

  getAllProductsInventory(): Observable<InventoryModel[]> {
    return this.http.get<InventoryModel[]>(INVENTORY_URL, {
      headers: this.headerTokenBearer.getHeaderBearerToken()
    });
  }
}
