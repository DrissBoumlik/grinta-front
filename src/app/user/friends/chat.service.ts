import { Injectable } from '@angular/core';
import {User} from '../user.model';
import {Subject} from 'rxjs';
import {AuthService} from '../../Auth/auth.service';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable()
export class ChatService {
  user: User;
  userLoaded = new Subject<User>();

  constructor(private http: HttpClient) { }

  getUser(username: string = null) {
    AuthService.getHeaders();
    const url = environment.baseApiUrl + '/user-profile/' + (username === null ? '' : username);
    return this.http.get(url, {headers: AuthService.headers})
      .pipe(
        tap(
          (data: any) => {
            console.log(data);
            // this.profile = data.user;
            // this.alreadyLoaded = true;
            // this.profileLoaded.next(this.profile);
          },
          error => console.log(error.status),
        )
      );
  }
}
