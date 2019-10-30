import { Component, OnInit } from '@angular/core';
import {Page} from './page.model';
import {ActivatedRoute, Params} from '@angular/router';
import {User} from '../../user.model';
import {PageService} from './page.service';

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
    this.route.params.subscribe((params: Params) => {
      window.scroll(0, 0);
      const pagename = params.pagename;
      this.pageService.getPage(pagename).subscribe((response: any) => {
        this.page = response.page;
        this.user = response.page.user;
        console.log(this.page.cover);
      });
    });
  }

}
