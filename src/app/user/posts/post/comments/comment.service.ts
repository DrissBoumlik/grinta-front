import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Comment } from './comment/comment.model';

@Injectable()
export class CommentService {
  
  headers = new HttpHeaders({
    // 'Content-Type': 'application/json',
    "Authorization": 'Bearer ' + localStorage.getItem('_token'), Accept: "application/json"
  });
  constructor(private http: HttpClient) {}
  
  createComment(user_id: number, post_id: number, content: string): Observable<any> {
    return this.http.post(environment.baseApiUrl + '/comments', {user_id: user_id, post_id: post_id, content: content}, {headers: this.headers});
  }
  
  addComment(comments: Comment[], comment: Comment) {
    comments.unshift(comment);
    return comments;
  }
}