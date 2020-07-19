import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../Auth/auth.service';
import {User} from '../../user.model';
import {Page} from './page.model';
import {environment} from '../../../../environments/environment';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class PageService {
  user: User;
  page: Page;
  pageLoaded = new Subject<Page>();

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.user = this.authService.user;
  }

  getPage(pagename) {
    AuthService.getHeaders();
    return this.http.get(environment.baseApiUrl + '/pages/' + pagename, {headers: AuthService.headers})
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
