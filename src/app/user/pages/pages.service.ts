import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Page} from './page/page.model';
import {Subject} from 'rxjs';
import {PageService} from './page/page.service';
import {AuthService} from '../../Auth/auth.service';

@Injectable()
export class PagesService {
  pages: Page[];
  managedPages: Page[];
  pageInvitations: Page[];
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

  removePage(id: number) {
    this.pages = this.pages.filter((page) => page.id !== id);
    this.managedPages = this.managedPages.filter((page) => page.id !== id);
    this.pageInvitations = this.pageInvitations.filter((page) => page.id !== id);
    this.pagesUpdated.next({pages: this.pages, managedPages: this.managedPages, pageInvitations: this.pageInvitations});
  }

  deletePage(id: number, type: string = null) {
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
