import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import {User} from '../user/user.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  static headers = new HttpHeaders({'Content-Type': 'application/json'});
  public user: User;

  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem('_user')) as User;
  }

  static getHeaders() {
    const token = localStorage.getItem('_token');
    AuthService.headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    });
  }

  register(isSocial, username, firstname, lastname, email, password, passwordConfirmation, gender, picture, cover, sport, city) {
    return this.http.post(environment.baseApiUrl + '/register',
      {isSocial, username, firstname, lastname, email, password,
        password_confirmation: passwordConfirmation, gender, picture, cover, sport, city},
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

    login(isSocial, username: string, password: string) {
    console.log(username, password);
    return this.http.post(environment.baseApiUrl + '/login',
      {isSocial, username, email: username, password},
      {headers: AuthService.headers})
      .pipe(
        tap(
          (response: any) => {
            this.user = response.success.user;
            localStorage.setItem('_token', response.success.token);
            localStorage.setItem('_user', JSON.stringify(response.success.user));
          },
          error => console.log(error.status),
        )
      );
  }

  logout() {
    AuthService.getHeaders();
    localStorage.removeItem('_token');
    localStorage.removeItem('_user');
    return this.http.get(environment.baseApiUrl + '/logout', {headers: AuthService.headers})
    .pipe(
      tap(
        data => console.log(data),
        error => console.log(error.status),
      )
    );
  }

  isLogged(router: Router) {

    const userLogged = localStorage.getItem('_token') !== null && localStorage.getItem('_token') !== undefined;
    if (!userLogged) {
      router.navigate(['/']);
    }
  }

}
