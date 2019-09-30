import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { environment } from './../../environments/environment';

import { Error } from './../shared/error';
import {User} from '../user/user.model';
import { map } from "rxjs/operators";

@Injectable()
export class LoginService {
  public user: User;
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  loginEvent = new Subject<User>();
  logoutEvent = new Subject();
  // private http: HttpClient = new HttpClient();

  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem('_user')) as User;
  }

  login(username: string, password: string) {
    let img = 'http://media-assets.dv/images/think-twice-code-once-2560x1600.jpg';

    this.http.post(environment.baseUrl + '/login', JSON.stringify({email: username, password: password}), {headers: this.headers})
      .toPromise()
      .then((response: any) => {
        localStorage.setItem('_token', response.success.token);
        localStorage.setItem('_user', response.success.user);
        this.user = response.success.user;
        this.loginEvent.next(this.user);
      })
      .catch(Error.handleError);
  }

  logout() {
    localStorage.removeItem('_token');
    localStorage.removeItem('_user');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": 'Bearer ' + localStorage.getItem('_token'), Accept: "application/json"
    });
    this.http.get(environment.baseUrl + '/logout', {headers: headers})
    .toPromise()
    .then(() => {
      this.logoutEvent.next();
    })
    .catch(Error.handleError);
  }

}
