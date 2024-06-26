import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Page} from './page/page.model';
import {Subject} from 'rxjs';
import {PageService} from './page/page.service';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class PagesService {
  pages: Page[] = [];
  adminedPages: Page[] = [];
  moderatedPages: Page[] = [];
  pagesUpdated = new Subject();

  constructor(private http: HttpClient,
              private pageService: PageService) {}

  getPageByPagename(pagename: string) {
    let page;
    try {
      page = this.pages.find((_page) => _page.pagename === pagename);
    } catch (e) {
      console.log(e);
      return this.pageService.getPage(pagename);
    }
    return page;
  }

  likePage(page: Page) {
    AuthService.getHeaders();
    return this.http.post(environment.baseApiUrl + '/like-page', {page_id: page.id}, {headers: AuthService.headers})
      .pipe(
        tap(
          data => {
            // console.log(data);
          },
          error => console.log(error.status),
        )
      );
  }

  unlikePage(page: Page) {
    AuthService.getHeaders();
    return this.http.delete(environment.baseApiUrl + '/unlike-page/' + page.id, {headers: AuthService.headers})
      .pipe(
        tap(
          data => {
            // console.log(data);
          },
          error => console.log(error.status),
        )
      );
  }

  removePage(id: number) {
    this.pages = this.pages.filter((page) => page.id !== id);
    this.adminedPages = this.adminedPages.filter((page) => page.id !== id);
    this.moderatedPages = this.moderatedPages.filter((page) => page.id !== id);
    this.pagesUpdated.next({pages: this.pages, adminedPages: this.adminedPages, moderatedPages: this.moderatedPages});
  }

  deletePage(id: number, type: string | null) {
    AuthService.getHeaders();
    return this.http.delete(environment.baseApiUrl + '/pages/' + id + '?type=' + (type ? type : ''), {headers: AuthService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }
}
