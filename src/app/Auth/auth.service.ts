import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

import {User} from '../user/user.model';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
  static headers = new HttpHeaders({'Content-Type': 'application/json'});
  public user: User;

  constructor(private http: HttpClient,
              private router: Router) {
    this.user = JSON.parse(localStorage.getItem('_user')) as User;
  }

  static getHeaders() {
    const token = localStorage.getItem('_token');
    AuthService.headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    });
  }

  register(body: any) {
    return this.http.post(environment.baseApiUrl + '/register',
      body,
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  login(body: any) {
    return this.http.post(environment.baseApiUrl + '/login',
      body,
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
          data => {
            console.log(data);
            this.router.navigate(['/']);
          },
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
