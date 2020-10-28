import { Injectable } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MediaService {

  constructor(private http: HttpClient) { }

  createAlbum(params) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/albums',
      {...params},
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }

  createMedia(params) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/media',
      {...params},
      {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }
}
