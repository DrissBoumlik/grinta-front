import {User} from '../user/user.model';
import {Subject} from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Injectable } from '@angular/core';
@Injectable()

export class LoginService {
  public user: User;
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  loginEvent = new Subject<User>();
  logoutEvent = new Subject();
  // private http: HttpClient = new HttpClient();

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    let img = 'http://media-assets.dv/images/think-twice-code-once-2560x1600.jpg';

    this.http.post('http://127.0.0.1:8000/api/login', JSON.stringify({email: username, password: password}), {headers: this.headers})
      .toPromise()
      .then((response: any) => {
        localStorage.setItem('_token', response.success.token);
        localStorage.setItem('_user', response.success.user);
        this.user = response.success.user;
        this.loginEvent.next(this.user);
      })
      .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('_token');
    localStorage.removeItem('_user');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": 'Bearer ' + localStorage.getItem('_token'), Accept: "application/json"
    });
    this.http.get('http://127.0.0.1:8000/api/logout', {headers: headers})
    .toPromise()
    .then(() => {
      this.logoutEvent.next();
    });
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
