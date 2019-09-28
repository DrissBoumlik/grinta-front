import { LoginService } from '../../login/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PostService {
  posts : Post[] = [];
  postEvent = new Subject<Post[]>();
  headers = new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + localStorage.getItem('_token'), Accept: "application/json"
      });
  constructor(private loginService: LoginService,
              private http: HttpClient) {}

  getPosts(page = null) {
    this.http.get('http://127.0.0.1:8000/api/posts?page=' + page, {headers: this.headers})
    .toPromise()
    .then((friendsPosts: any) => {
      this.posts = friendsPosts;
      this.postEvent.next(friendsPosts);
    })
    .catch(this.loginService.handleError);
    return this.posts;
  }
}
