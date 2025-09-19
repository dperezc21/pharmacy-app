import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User, UserAuth} from '../models/user.models';
import {AUTH_USER_URL} from '../constants/url.constants';
import {HttpHeaderTokenBearer} from './HttpHeaderTokenBearer';

@Injectable({ providedIn: 'root' })
export class AuthUserService {

  constructor(private httpClient: HttpClient, private headerTokenBearer: HttpHeaderTokenBearer) { }

  loginUser(user: UserAuth): Observable<User> {
    return this.httpClient.post<User>(`${AUTH_USER_URL}/login`, user)
  }

  registerUser(userRegister: User): Observable<User> {
    return this.httpClient.post<User>(`${AUTH_USER_URL}/register`, userRegister, {
      headers: this.headerTokenBearer.getHeaderBearerToken()
    })
  }

  updateUser({id, ...userToUpdate}: User): Observable<User> {
    return this.httpClient.put<User>(`${AUTH_USER_URL}/update/${id}`, userToUpdate, {
      headers: this.headerTokenBearer.getHeaderBearerToken()
    })
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${AUTH_USER_URL}`, {
      headers: this.headerTokenBearer.getHeaderBearerToken()
    })
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${AUTH_USER_URL}/${userId}`, {
      headers: this.headerTokenBearer.getHeaderBearerToken()
    });
  }

  verifyToken(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${AUTH_USER_URL}/verify`, {
      headers: this.headerTokenBearer.getHeaderBearerToken()
    });
  }
}
