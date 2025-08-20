import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CATEGORY_URL} from '../constants/url.constants';
import {Category} from '../models/ApplicationValue';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(CATEGORY_URL);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${CATEGORY_URL}/${id}`);
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(CATEGORY_URL, category);
  }
}
