import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {User} from '../user.model';

// import {r} from 'rethinkdb-ts';

@Injectable()
export class FriendsService {
  static headers = undefined;
  friends: User[] = [];

  constructor(private http: HttpClient) {}

  static getHeaders() {
    FriendsService.headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('_token')
    });
  }



  getFriends() {
    FriendsService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/friends', {headers: FriendsService.headers})
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
}
