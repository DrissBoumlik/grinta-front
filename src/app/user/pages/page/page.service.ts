import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../../Auth/auth.service';
import {User} from '../../user.model';
import {Page} from './page.model';
import {environment} from '../../../../environments/environment';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Post} from '../../posts/post/post.model';

@Injectable()
export class PageService {
  static headers = undefined;
  user: User;
  page: Page;
  pageLoaded = new Subject<Page>();

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.user = this.authService.user;
  }

  static getHeaders() {
    PageService.headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('_token')
    });
  }

  getPage(pagename) {
    PageService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/pages/' + pagename, {headers: PageService.headers})
      .pipe(
          tap(
            (data: any) => {
              this.page = data.page;
              this.user = data.page.user;
              this.pageLoaded.next(data.page);
              console.log(data);
            },
              error => console.log(error)
          )
        );
  }
}
