import {User} from '../user.model';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Post} from '../posts/post/post.model';
import {Injectable} from '@angular/core';

@Injectable()
export class ProfileService {
  static headers = undefined;
  profile: User;
  posts: Post;
  profileLoaded = new Subject<User>();

  constructor(private http: HttpClient) {
    ProfileService.headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('_token')
    });
  }

  static getHeaders() {
    ProfileService.headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('_token')
    });
  }

  getProfile(username: string = null) {
    ProfileService.getHeaders();
    const url = environment.baseApiUrl + '/user-profile/' + (username === null ? '' : username);
    return this.http.get(url, {headers: ProfileService.headers})
      .pipe(
        tap(
          (data: any) => {
            this.profile = data.user;
            this.profileLoaded.next(this.profile);
          },
          error => console.log(error.status),
        )
      );
  }
}
