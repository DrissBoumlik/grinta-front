import { Injectable } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class NoteService {

  constructor(private http: HttpClient) { }

  getNotesByUser(uuid: string = null) {
    uuid = uuid || '';
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + `/notes/${uuid}`, {headers: AuthService.headers})
      .pipe(
        tap(
          (data: any) => {
            console.log(data);
          },
          error => console.log(error)
        )
      );
  }
}
