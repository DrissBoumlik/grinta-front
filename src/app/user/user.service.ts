import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class UserService {
  user: User | any;
  friends: User[] = [];
  // posts: Post[] = [];


  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.user = this.authService.user;
  }

  getUsers(userNames: any[]) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/users/list',
      {userNames},
      {headers: AuthService.headers})
      .pipe(
        tap(
          (data: any) => {
            console.log(data);
            // this.profile = data.user;
            // this.alreadyLoaded = true;
            // this.profileLoaded.next(this.profile);
          },
          error => console.log(error.status),
        )
      );
  }

  getLatestBirthDates(params: any) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/users/birthdates/latests',
      { limit: params.limit, period: params.periode},
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  followUser(followedId: number) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/followers', {followedId}, {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error),
        )
      );
  }

  unFollowUser(followedId: number) {
    AuthService.getHeaders();
    return this.http.delete(environment.baseApiUrl + '/followers/' + followedId, {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error),
        )
      );
  }

  addFriend(friendId: number) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/friends', {friendId}, {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error),
        )
      );
  }

  removeFriend(friendId: number) {
    AuthService.getHeaders();
    return this.http.delete(environment.baseApiUrl + '/friends/' + friendId, {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error),
        )
      );
  }

  acceptRequest(friendId: number) {
    AuthService.getHeaders();
    return this.http.put(environment.baseApiUrl + '/friends', {friendId, accept: 1}, {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error),
        )
      );
  }

  cancelRequest(friendId: number) {
    AuthService.getHeaders();
    return this.http.put(environment.baseApiUrl + '/friends', {friendId, accept: -1}, {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error),
        )
      );
  }

  updatePage(page: any) {
    AuthService.getHeaders();
    return this.http.put(environment.baseApiUrl + '/pages',
      {
        name: page.name,
        pagename: page.pagename,
        image: page.image,
        cover: page.cover,
        type: page.type,
        description: page.description,
        sport: page.sport
      },
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  createPage(page: any) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/pages',
      {
        name: page.name,
        pagename: page.pagename,
        image: page.image,
        cover: page.cover,
        type: page.type,
        description: page.description,
        sport: page.sport
      },
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  createEvent(event: any) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/events',
      {
        name: event.name,
        date: event.date,
        limit_signup: event.limit_signup,
        address: event.address,
        location: event.location,
        image: event.image,
        cover: event.cover,
        type: event.type,
        description: event.description,
        sport_id: event.sport_id
      },
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  updateEvent(event: any) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/events',
      {
        uuid: event.uuid,
        name: event.name,
        date: event.date,
        limit_signup: event.limit_signup,
        address: event.address,
        location: event.location,
        image: event.image,
        cover: event.cover,
        type: event.type,
        description: event.description,
        sport_id: event.sport_id
      },
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

}
