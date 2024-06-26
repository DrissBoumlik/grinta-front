import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';

import {Post} from './post.model';
import {Comment} from './comments/comment/comment.model';
import {AuthService} from '../../../auth/auth.service';

@Injectable()
export class PostService {
  post: Post | any;
  postCommentsUpdated = new Subject<Comment[]>();

  constructor(private http: HttpClient) {}

  createComment(body: any): Observable<any> {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/comments',
      body,
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  addComment(comment: Comment) {
    this.post.comments.unshift(comment);
    this.postCommentsUpdated.next(this.post.comments);
  }

  removeComment(comment: Comment) {
    this.post.comments = this.post.comments.filter((commentItem: any) => commentItem.id !== comment.id);
    this.postCommentsUpdated.next(this.post.comments);
  }

  likeComment(comment: Comment) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/like-comment',
      {comment}, {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  unlikeComment(comment: Comment) {
    AuthService.getHeaders();
    return this.http.delete(environment.baseApiUrl + '/unlike-comment/' + comment.id,
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }


  deleteComment(comment: Comment) {
    AuthService.getHeaders();
    return this.http.delete(environment.baseApiUrl + '/comments/' + comment.id,
      {headers: AuthService.headers})
      .pipe(
        tap(
          (data: any) => {
            console.log(data);
            this.removeComment(data.comment);
          },
          error => console.log(error.status),
        )
      );
  }

  updateComment(body: any, commentId: number): Observable<any> {
    AuthService.getHeaders();
    return this.http.put(environment.baseApiUrl + '/comments/' + commentId,
      body, {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }
}
