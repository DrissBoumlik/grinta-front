import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { ErrorService } from '../../../shared/error.service';
import { LoginService } from '../../../login/login.service';
import { Post } from './post.model';
import { environment } from '../../../../environments/environment';
import { User } from '../../user.model';


@Injectable()
export class PostService {
  posts : Post[] = [];
  postsUpdated = new Subject<Post[]>();
  headers = new HttpHeaders({
        // 'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + localStorage.getItem('_token'), Accept: "application/json"
      });
  constructor(private loginService: LoginService,
              private errorService: ErrorService,
              private http: HttpClient) {}

  getPosts(page = null) {
    return this.http.get(environment.baseApiUrl + '/posts?page=' + page, {headers: this.headers});
  }

  likePost(post: Post) {
    return this.http.post(environment.baseApiUrl + '/like-post', {post: post}, {headers: this.headers});
  }

  createPost(content: string, image: File): Observable<any> {
    return this.http.post(environment.baseApiUrl + '/posts', {content: content, image: image}, {headers: this.headers});
  }

  sharePost(content: string, image: string, postOwnerId: number): Observable<any> {
    return this.http.post(environment.baseApiUrl + '/posts', {content: content, image: image, postOwnerId: postOwnerId}, {headers: this.headers});
  }



  addPost(post: Post) {
    this.posts.unshift(post);
    this.postsUpdated.next(this.posts);
  }
}
