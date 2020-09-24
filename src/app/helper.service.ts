import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth/auth.service';
import {environment} from '../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable()
export class HelperService {

  constructor(private http: HttpClient) { }

  getRandomUser() {
    return this.http.get(environment.baseApiUrl + '/models/User', {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }
}
