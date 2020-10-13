import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EventFeedbackService {

  eventFeedbackReceived = new Subject<object>();
  constructor(private http: HttpClient) { }

  sendFeedback(participated: number) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/events/score',
      {participated},
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  noteUsers(notedUsers: any, eventUuid) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/events/notes', {users: notedUsers, event: eventUuid},
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }
}
