import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import {AuthService} from '../Auth/auth.service';

@Injectable()
export class UserService {
  user: User;
  friends: User[] = [];
  // posts: Post[] = [];


  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.user = this.authService.user;
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

  updatePage(name, pagename, image, cover, type, description, sport) {
    AuthService.getHeaders();
    return this.http.put(environment.baseApiUrl + '/pages',
      {name, pagename, image, cover, type, description, sport},
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  createPage(name, pagename, image, cover, type, description, sport) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/pages',
      {name, pagename, image, cover, type, description, sport},
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  createEvent(name, date, limitSignup, address, location, image, cover, type, description) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/events',
      {name,  date, limit_signup: limitSignup, address, location, image, cover, type, description},
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

}
