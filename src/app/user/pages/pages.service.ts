import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Page} from './page/page.model';
import {Subject} from 'rxjs';

@Injectable()
export class PagesService {
  static headers = undefined;
  pages: Page[];
  managedPages: Page[];
  pageInvitations: Page[];
  pagesUpdated = new Subject();

  constructor(private http: HttpClient) {}

  static getHeaders() {
    PagesService.headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('_token')
    });
  }

  getPageByPagename(pagename: string) {
    const page = this.pages.find((_page) => _page.pagename === pagename);
    return page;
  }

  removePage(id: number) {
    this.pages = this.pages.filter((page) => page.id !== id);
    this.managedPages = this.managedPages.filter((page) => page.id !== id);
    this.pageInvitations = this.pageInvitations.filter((page) => page.id !== id);
    this.pagesUpdated.next({pages: this.pages, managedPages: this.managedPages, pageInvitations: this.pageInvitations});
  }

  deletePage(id: number, type: string = null) {
    PagesService.getHeaders();
    return this.http.delete(environment.baseApiUrl + '/pages/' + id + '?type=' + (type ? type : ''), {headers: PagesService.headers})
      .pipe(
        tap(
          data => console.log(data),
          error => console.log(error.status),
        )
      );
  }
}
