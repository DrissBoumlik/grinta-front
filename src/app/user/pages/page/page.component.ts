import { Component, OnInit } from '@angular/core';
import {Page} from './page.model';
import {ActivatedRoute, Params} from '@angular/router';
import {User} from '../../user.model';
import {PageService} from './page.service';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  user: User;
  page: Page;
  constructor(private route: ActivatedRoute,
              private pageService: PageService) { }

  ngOnInit() {
    let pagename = this.route.snapshot.params.pagename;
    this.onGetPage(pagename);
    this.route.params.subscribe((params: Params) => {
      window.scroll(0, 0);
      pagename = params.pagename;
      this.onGetPage(pagename);
    });
  }

  onGetPage(pagename: string) {
    this.pageService.getPage(pagename).subscribe((response: any) => {
      this.page = response.page;
      this.user = response.page.user;
    });
  }

  protected readonly environment = environment;
}
