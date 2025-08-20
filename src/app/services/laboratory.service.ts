import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LABORATORY_URL} from '../constants/url.constants';
import {Laboratory} from '../models/ApplicationValue';


@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

  constructor(private http: HttpClient) {}

  getAllLaboratories(): Observable<Laboratory[]> {
    return this.http.get<Laboratory[]>(LABORATORY_URL);
  }

  getLaboratoryById(id: number): Observable<Laboratory> {
    return this.http.get<Laboratory>(`${LABORATORY_URL}/${id}`);
  }

  createLaboratory(lab: Laboratory): Observable<Laboratory> {
    return this.http.post<Laboratory>(LABORATORY_URL, lab);
  }
}
