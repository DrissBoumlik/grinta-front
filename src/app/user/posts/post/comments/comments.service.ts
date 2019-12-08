import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class CommentsService {
  static headers = undefined;

  constructor(private http: HttpClient) {}

  static getHeaders() {
    CommentsService.headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('_token')
    });
  }
}
