import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {Sport} from '../user/sports/sport.model';

@Injectable()
export class SportService {
  static headers = undefined;
  sports: Sport[] = [];

  constructor(private http: HttpClient) {
  }

  static getHeaders() {
    SportService.headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('_token')
    });
  }

  getSports() {
    SportService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/sports', {headers: SportService.headers})
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
