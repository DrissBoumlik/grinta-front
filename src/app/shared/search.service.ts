import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable()
export class SearchService {
  static headers = undefined;
  results: {header: string, image: string, link: string}[];
  resultsLoaded = new Subject<{header: string, image: string, link: string}>();
  resultsShowed = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  static getHeaders() {
    SearchService.headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('_token')
    });
  }

  searchEverything(term: any) {
    SearchService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/search/' + term, {headers: SearchService.headers})
      .pipe(
        tap(
          (data: any) => {
            console.log(data);
            this.resultsLoaded.next(data.results);
            this.resultsShowed.next(data.results.length > 0);
          },
          error => console.log(error)
        )
      );
  }
}
