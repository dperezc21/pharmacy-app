import {UserAuthenticatedController} from '../controllers/user-authenticated.controller';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';


@Injectable({ providedIn: "root"})
export class HttpHeaderTokenBearer {

  constructor(private userAuthController: UserAuthenticatedController) {}
  getHeaderBearerToken() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.userAuthController.userTokenGot()}`
    });
  }
}
