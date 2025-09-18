import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LABORATORY_URL} from '../constants/url.constants';
import {Laboratory} from '../models/ApplicationValue';
import {HttpHeaderTokenBearer} from './HttpHeaderTokenBearer';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

  constructor(private http: HttpClient, private headerTokenBearer: HttpHeaderTokenBearer) {}

  getAllLaboratories(): Observable<Laboratory[]> {
    return this.http.get<Laboratory[]>(LABORATORY_URL, {
      headers: this.headerTokenBearer.getHeaderBearerToken()
    });
  }

  createLaboratory(lab: Laboratory): Observable<Laboratory> {
    return this.http.post<Laboratory>(LABORATORY_URL, lab);
  }
}
