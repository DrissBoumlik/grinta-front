import { Injectable } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Event} from '../user/events/event.model';
import {User} from '../user/user.model';

@Injectable()
export class EventService {
  user: User;
  event: Event;
  eventLoaded = new Subject<Event>();

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

  getEventByUuid(uuid: string) {
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/events/uuid/' + uuid, {headers: AuthService.headers})
      .pipe(
        tap(
          (data: any) => {
            this.event = data.event;
            this.user = data.event.user;
            this.eventLoaded.next(data.event);
            console.log(data);
          },
          error => console.log(error)
        )
      );
  }
}
