import { Router } from '@angular/router';
import { ErrorService } from './../shared/error.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { environment } from './../../environments/environment';

import {User} from '../user/user.model';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable()
export class LoginService {
  public user: User;
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  // private http: HttpClient = new HttpClient();

  constructor(private http: HttpClient,
              private userService: UserService) {
    this.user = JSON.parse(localStorage.getItem('_user')) as User;
  }

  login(username: string, password: string) {
    return this.http.post(environment.baseApiUrl + '/login',
      JSON.stringify({username: username, email: username, password: password}),
      {headers: this.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  logout() {
    localStorage.removeItem('_token');
    localStorage.removeItem('_user');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": 'Bearer ' + localStorage.getItem('_token'), Accept: "application/json"
    });
    return this.http.get(environment.baseApiUrl + '/logout', {headers: headers})
    .pipe(
      tap(
        data => console.log(data),
        error => console.log(error.status),
      )
    );
  }

  isLogged(router: Router) {

    let userLogged = localStorage.getItem('_token') !== null && localStorage.getItem('_token') !== undefined;
    if(!userLogged)
      router.navigate(['/']);
  }

}
