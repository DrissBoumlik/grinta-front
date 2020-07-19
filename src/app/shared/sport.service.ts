import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {Sport} from '../user/sports/sport.model';
import {AuthService} from '../Auth/auth.service';

@Injectable()
export class SportService {
  sports: Sport[] = [];

  constructor(private http: HttpClient) {
  }

  getSports() {
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/sports', {headers: AuthService.headers})
      .pipe(
        tap(
          (data: any) => {
            this.sports = data.sports;
            console.log(data);
          },
          error => console.log(error)
        )
      );
  }
}
