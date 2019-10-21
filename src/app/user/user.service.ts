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

  postsUpdated = new Subject<Post[]>();

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
    return this.http.get(environment.baseApiUrl + '/sports', {headers: UserService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error)
        )
      );
  }

getPosts(page = 1, profileId = null) {
    profileId = profileId === null ? '' : profileId + '/';
    UserService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/posts/' + profileId + '?page=' + page, {headers: UserService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error),
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

  addPost(post: Post) {
    this.user.posts.unshift(post);
    this.postsUpdated.next(this.user.posts);
  }

  removePost(post: Post) {
    this.user.posts = this.user.posts.filter((_post) => _post.id !== post.id);
    this.postsUpdated.next(this.user.posts);
  }

  likePost(post: Post) {
    return this.http.post(environment.baseApiUrl + '/like-post', {post}, {headers: UserService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  unlikePost(post: Post) {
    return this.http.delete(environment.baseApiUrl + '/unlike-post/' + post.id, {headers: UserService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  createPost(content: string, image: File): Observable<any> {
    return this.http.post(environment.baseApiUrl + '/posts', {content, image}, {headers: UserService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  sharePost(content: string, image: string, postOwnerId: number): Observable<any> {
    return this.http.post(environment.baseApiUrl + '/posts',
      {content, image, postOwnerId}, {headers: UserService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  deletePost(post_id: number) {
    return this.http.delete(environment.baseApiUrl + '/posts/' + post_id, {headers: UserService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  createPage(name, pagename, image, cover, type, description) {
    return this.http.post(environment.baseApiUrl + '/pages',
      {name, pagename, image, cover, type, description},
      {headers: UserService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }
  createEvent(name, date, limit_signup, address, location, image, cover, type, description) {
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
