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
    this.user = JSON.parse(localStorage.getItem('authUser')) as User;
  }

  static getHeaders() {
    const token = localStorage.getItem('token');
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
            localStorage.setItem('token', response.success.token);
            localStorage.setItem('authUser', JSON.stringify(response.success.user));
          },
          error => console.log(error.status),
        )
      );
  }

  logout(params = {serverSide: true}) {
    if (params.serverSide) {
      AuthService.getHeaders();
      return this.http.get(environment.baseApiUrl + '/logout', {headers: AuthService.headers})
        .pipe(
          tap(
            (data: any) => {
              console.log(data);
              this.user = data.success.user;
              localStorage.removeItem('token');
              localStorage.removeItem('authUser');
              this.router.navigate(['/']);
            },
            error => console.log(error.status),
          )
        );
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('authUser');
    }

  }

  isLogged(router: Router) {

    const userLogged = localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined;
    if (!userLogged) {
      router.navigate(['/']);
    }
  }

}
