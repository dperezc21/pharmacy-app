import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CATEGORY_URL} from '../constants/url.constants';
import {Category} from '../models/ApplicationValue';
import {HttpHeaderTokenBearer} from './HttpHeaderTokenBearer';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private headerTokenBearer: HttpHeaderTokenBearer) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(CATEGORY_URL, {
      headers: this.headerTokenBearer.getHeaderBearerToken()
    });
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(CATEGORY_URL, category, {
      headers: this.headerTokenBearer.getHeaderBearerToken()
    });
  }
}
