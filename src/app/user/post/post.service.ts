import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Error } from './../../shared/error';
import { LoginService } from '../../login/login.service';
import { Post } from './post.model';
import { environment } from './../../../environments/environment';
import { User } from '../user.model';


@Injectable()
export class PostService {
  posts : Post[] = [];
  friends : User[] = [];
  postEvent = new Subject<Post[]>();
  headers = new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + localStorage.getItem('_token'), Accept: "application/json"
      });
  constructor(private loginService: LoginService,
              private http: HttpClient) {}

  getPosts(page = null) {
    this.http.get(environment.baseUrl + '/posts?page=' + page, {headers: this.headers})
    .toPromise()
    .then((response: any) => {
      console.log(response);
      this.posts = response.posts;
      this.friends = response.friends;
      this.postEvent.next(response);
    })
    .catch(Error.handleError);
    return this.posts;
  }

  likePost(post: Post) {
      this.http.post(environment.baseUrl + '/like-post', JSON.stringify({post: post}), {headers: this.headers})
        .toPromise()
        .then((response: any) => {
          console.log(response);
        })
        .catch(Error.handleError);
  }

  sharePost(content: string, image: string) {
    this.http.post(environment.baseUrl + '/posts', {content: content, image: image}, {headers: this.headers})
      .toPromise()
      .then((response: any) => {
        console.log(response);
      })
      .catch(Error.handleError);
  }
}
