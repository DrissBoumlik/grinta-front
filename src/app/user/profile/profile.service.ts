import {User} from '../user.model';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Post} from '../posts/post/post.model';
import {Injectable} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class ProfileService {
  profile: User | any;
  posts: Post | any;
  profileLoaded = new Subject<User>();
  profileUpdated = new Subject<User>();
  alreadyLoaded = false;

  constructor(private http: HttpClient) {}

  getProfile(username: string | null) {
    AuthService.getHeaders();
    const url = environment.baseApiUrl + '/users/profile/' + (username === null ? '' : username);
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

  updateProfile(profile: any) {
    AuthService.getHeaders();
    return this.http.put(environment.baseApiUrl + '/users/profile',
      {
        username: profile.username,
        firstname: profile.firstname,
        lastname: profile.lastname,
        // email: profile.email,
        // password: profile.password,
        // password_confirmation: profile.password_confirmation,
        gender: profile.gender,
        birth_date: profile.birth_date,
        picture: profile.picture,
        cover: profile.cover,
        // sport: profile.sport,
        address: profile.address,
        city: profile.city,
        country: profile.country
      },
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  updatePassword(profile: any) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/password/reset',
      {
        password_old: profile.password_old,
        password: profile.password,
        password_confirmation: profile.password_confirmation,
      },
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  updateContact(profile: any) {
    AuthService.getHeaders();
    return this.http.put(environment.baseApiUrl + '/users/profile',
      {
        phone_number: profile.phone_number,
        email: profile.email,
      },
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
      return this.profile.albums.find((album: any) => {
        return album.id === id;
      });
    }
  }
}
