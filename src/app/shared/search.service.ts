import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {AuthService} from '../Auth/auth.service';

@Injectable()
export class SearchService {
  results: {header: string, image: string, link: string}[];
  resultsLoaded = new Subject<{header: string, image: string, link: string}>();
  resultsShowed = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  searchEverything(term: any = null) {
    term = [null, undefined].includes(term) ? '' : term;
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/search/' + term, {headers: AuthService.headers})
      .pipe(
        tap(
          (data: any) => {
            console.log(data);
            this.resultsLoaded.next(data.results);
            // this.resultsShowed.next(data.results.length > 0);
          },
          error => console.log(error)
        )
      );
  }
}
