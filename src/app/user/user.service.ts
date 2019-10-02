import { ErrorService } from './../shared/error.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { User } from './user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  friends : User[] = [];

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization": 'Bearer ' + localStorage.getItem('_token'), Accept: "application/json"
  });

  constructor (private http: HttpClient,
                private errorService: ErrorService) {}

  getFriends() {
    return this.http.get(environment.baseApiUrl + '/friends', {headers: this.headers});
  }

}
