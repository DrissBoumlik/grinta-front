import { Injectable } from '@angular/core';
import {AuthService} from '../Auth/auth.service';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EventService {

  constructor(private http: HttpClient) { }

  getEvents() {
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/events', {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  getNearEvents(kilometers, latitude, longitude) {
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + `/events/${kilometers}/location/${latitude}/${longitude}`, {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }
}
