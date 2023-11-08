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
  user: User | any;
  event: Event | any;
  eventLoaded = new Subject<Event>();
  eventUpdated = new Subject<Event>();

  constructor(private http: HttpClient) { }

  getEvents(params = {page: 1, searchTerm: ''}) {
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + `/events?page=${params.page || 1}&searchTerm=${params.searchTerm || ''}`,
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  getNearEvents(kilometers, position: any) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + `/events/location`,
      {
        kilometers,
        latitude: position.latitude,
        longitude: position.longitude
      },
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  getLatestEvents(params) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/events/latests',
      { limit: params.limit, period: params.periode},
      {headers: AuthService.headers})
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

  inviteUsers(usersUuids: any, eventUuid) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/events/invite', {users: usersUuids, event: eventUuid}, {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }
}
