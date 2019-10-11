import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';

import { LoginService } from '../login/login.service';
import { User } from './user.model';
import { Post } from './posts/post/post.model';

@Injectable()
export class UserService {
  friends : User[] = [];
  posts : Post[] = [];
  postsUpdated = new Subject<Post[]>();

  headers = undefined;

  constructor (private http: HttpClient) {
    this.headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      "Authorization": 'Bearer ' + localStorage.getItem('_token'), Accept: "application/json"
    });
  }

  getFriends() {
    return this.http.get(environment.baseApiUrl + '/friends', {headers: this.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  getProfile(username: string = null) {
    let url = environment.baseApiUrl + '/user-profile/' + (username === null ? '' : username);
    return this.http.get(url, {headers: this.headers})
    .pipe(
      tap(
        data => console.log(data),
        error => console.log(error.status),
      )
    );
  }


  addPost(post: Post) {
    this.posts.unshift(post);
    this.postsUpdated.next(this.posts);
  }

  removePost(post: Post) {
    this.posts = this.posts.filter((_post) => _post.id !== post.id);
    this.postsUpdated.next(this.posts);
  }

  getPosts(page = 1) {
    return this.http.get(environment.baseApiUrl + '/posts?page=' + page, {headers: this.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error),
        )
      );
  }

  likePost(post: Post) {
    return this.http.post(environment.baseApiUrl + '/like-post', {post: post}, {headers: this.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  unlikePost(post: Post) {
    return this.http.delete(environment.baseApiUrl + '/unlike-post/' + post.id, {headers: this.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  createPost(content: string, image: File): Observable<any> {
    return this.http.post(environment.baseApiUrl + '/posts', {content: content, image: image}, {headers: this.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  sharePost(content: string, image: string, postOwnerId: number): Observable<any> {
    return this.http.post(environment.baseApiUrl + '/posts', {content: content, image: image, postOwnerId: postOwnerId}, {headers: this.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  deletePost($post_id) {
    return this.http.delete(environment.baseApiUrl + '/posts/' + $post_id, {headers: this.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

}
