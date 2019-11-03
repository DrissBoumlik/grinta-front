import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {Post} from '../posts/post/post.model';
import {User} from '../user.model';

// import {r} from 'rethinkdb-ts';

@Injectable()
export class FriendsService {
  static headers = undefined;
  friends: User[] = [];
  friendsUpdated = new Subject<User[]>();

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

  // async getChat() {
    // const connection = await r.connect( {db: 'test', host: 'essorline.com', port: 28015});
    // const cursor = r.table('flutter').orderBy(r.desc('date')).run(connection);
    // console.log(cursor);
  // }
}
