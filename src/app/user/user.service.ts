import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Post } from './posts/post/post.model';
import {AuthService} from '../Auth/auth.service';

@Injectable()
export class UserService {
  static headers = undefined;
  user: User;
  friends: User[] = [];
  // posts: Post[] = [];


  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.user = this.authService.user;
  }

  static getHeaders() {
    UserService.headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('_token')
    });
  }

  getSports() {
    UserService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/sports', {headers: UserService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        )
      );
  }


  getFriends() {
    UserService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/friends', {headers: UserService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  followUser(followed) {
    UserService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/followers', {followed}, {headers: UserService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error),
        )
      );
  }

  AddFriend(friendId: number) {
    UserService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/friends', {friend: friendId}, {headers: UserService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error),
        )
      );
  }

  updatePage(name, pagename, image, cover, type, description, sport) {
    UserService.getHeaders();
    return this.http.put(environment.baseApiUrl + '/pages',
      {name, pagename, image, cover, type, description, sport},
      {headers: UserService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  createPage(name, pagename, image, cover, type, description, sport) {
    UserService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/pages',
      {name, pagename, image, cover, type, description, sport},
      {headers: UserService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  createEvent(name, date, limit_signup, address, location, image, cover, type, description) {
    UserService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/events',
      {name,  date, limit_signup, address, location, image, cover, type, description},
      {headers: UserService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

}
