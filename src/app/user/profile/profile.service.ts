import {User} from '../user.model';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Post} from '../posts/post/post.model';
import {Injectable} from '@angular/core';
import {AuthService} from '../../Auth/auth.service';

@Injectable()
export class ProfileService {
  profile: User;
  posts: Post;
  profileLoaded = new Subject<User>();
  profileUpdated = new Subject<User>();
  alreadyLoaded = false;

  constructor(private http: HttpClient) {
    AuthService.headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('_token')
    });
  }

  getProfile(username: string = null) {
    AuthService.getHeaders();
    const url = environment.baseApiUrl + '/user-profile/' + (username === null ? '' : username);
    return this.http.get(url, {headers: AuthService.headers})
      .pipe(
        tap(
          (data: any) => {
            this.profile = data.user;
            this.alreadyLoaded = true;
            this.profileLoaded.next(this.profile);
          },
          error => console.log(error.status),
        )
      );
  }

  updateProfile(username, firstname, lastname, email, password, passwordConfirmation, gender, picture, cover, sport, city) {
    AuthService.getHeaders();
    return this.http.put(environment.baseApiUrl + '/user-profile/' + username,
      {username, firstname, lastname, email, password,
        password_confirmation: passwordConfirmation, gender, picture, cover, sport, city},
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  getAlbum(id: number) {
    if (this.profile) {
      return this.profile.albums.find(album => {
        return album.id === id;
      });
    }
  }
}
