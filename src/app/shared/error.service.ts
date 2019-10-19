import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';


@Injectable()
export class ErrorService {
  logoutEvent = new Subject();

  constructor(private http: HttpClient) {}

  public handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    if (error.status === 401) {
      localStorage.removeItem('_token');
      localStorage.removeItem('_user');
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + localStorage.getItem('_token'), Accept: "application/json"
      });
      this.http.get(environment.baseApiUrl + '/logout', {headers: headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
    }
    return Promise.reject(error.message || error);
  }
}
