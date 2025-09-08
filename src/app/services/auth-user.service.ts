import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User, UserAuth} from '../models/user.models';
import {AUTH_USER_URL} from '../constants/url.constants';

@Injectable({ providedIn: 'root' })
export class AuthUserService {

  constructor(private httpClient: HttpClient) { }

  loginUser(user: UserAuth): Observable<User> {
    return this.httpClient.post<User>(`${AUTH_USER_URL}/login`, user)
  }

  registerUser(userRegister: User): Observable<User> {
    return this.httpClient.post<User>(`${AUTH_USER_URL}/register`, userRegister)
  }

  updateUser({id, ...userToUpdate}: User): Observable<User> {
    return this.httpClient.put<User>(`${AUTH_USER_URL}/update/${id}`, userToUpdate)
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${AUTH_USER_URL}`)
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${AUTH_USER_URL}/${userId}`);
  }
}
