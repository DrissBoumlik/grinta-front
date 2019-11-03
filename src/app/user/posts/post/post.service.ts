import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Post } from './post.model';
import { Comment } from './comments/comment/comment.model';

@Injectable()
export class PostService {
  static headers = undefined;
  post: Post;
  postCommentsUpdated = new Subject<Comment[]>();

  constructor(private http: HttpClient) {
    PostService.headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('_token')
    });
  }

  static getHeaders() {
    PostService.headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('_token')
    });
  }

  createComment(user_id: number, post_id: number, content: string, parent_id: number = null): Observable<any> {
    PostService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/comments',
      {user_id, post_id, content, parent_id},
      {headers: PostService.headers})
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
    this.post.comments = this.post.comments.filter((_comment) => _comment.id !== comment.id);
    this.postCommentsUpdated.next(this.post.comments);
  }

  likeComment(comment: Comment) {
    PostService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/like-comment',
      {comment}, {headers: PostService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  unlikeComment(comment: Comment) {
    PostService.getHeaders();
    return this.http.delete(environment.baseApiUrl + '/unlike-comment/' + comment.id,
      {headers: PostService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }


  deleteComment(comment: Comment) {
    PostService.getHeaders();
    return this.http.delete(environment.baseApiUrl + '/comments/' + comment.id,
      {headers: PostService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  updateComment(content: string, commentId: number): Observable<any> {
    PostService.getHeaders();
    return this.http.put(environment.baseApiUrl + '/comments/' + commentId,
      {content, comment_id: commentId}, {headers: PostService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }
}
