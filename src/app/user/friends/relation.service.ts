import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {User} from '../user.model';
import {AuthService} from '../../auth/auth.service';

// import {r} from 'rethinkdb-ts';

@Injectable()
export class RelationService {
  friends: User[] = [];
  followings: User[] = [];
  addedFriends: User[] = [];

  constructor(private http: HttpClient) {}

  getFriends() {
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/friends', {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  searchFriends(value: string) {
    return this.friends.filter((friend: User) => {
      return friend.firstname.toLowerCase().includes(value) || friend.lastname.toLowerCase().includes(value);
    });
  }

  getFollowings() {
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/followings', {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  getAddedFriends() {
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/friends/recent', {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }
}
