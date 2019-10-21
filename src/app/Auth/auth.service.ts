import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import {User} from '../user/user.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  public user: User;
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem('_user')) as User;
  }

  register(username, firstname, lastname, email, password, gender, picture, cover, sport) {
    return this.http.post(environment.baseApiUrl + '/register',
      {username, firstname, lastname, email, password, gender, picture, cover, sport},
      {headers: this.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  login(username: string, password: string) {
    return this.http.post(environment.baseApiUrl + '/login',
      JSON.stringify({username, email: username, password}),
      {headers: this.headers})
      .pipe(
        tap(
          (response: any) => {
            localStorage.setItem('_token', response.success.token);
            localStorage.setItem('_user', JSON.stringify(response.success.user));
          },
          error => console.log(error.status),
        )
      );
  }

  logout() {
    localStorage.removeItem('_token');
    localStorage.removeItem('_user');
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('_token')
    });
    return this.http.get(environment.baseApiUrl + '/logout', {headers})
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
