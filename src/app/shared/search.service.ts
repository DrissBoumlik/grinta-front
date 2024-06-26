import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class SearchService {
  results: {header: string, image: string, link: string}[];
  resultsLoaded = new Subject<{header: string, image: string, link: string}>();
  resultsShowed = new Subject<boolean>();
  searchTerm = null;

  constructor(private http: HttpClient) {}

  searchEverything(searchTerm: any = null) {
    searchTerm = [null, undefined].includes(searchTerm) ? '' : searchTerm;
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + `/search?term=${searchTerm}`, {headers: AuthService.headers})
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
